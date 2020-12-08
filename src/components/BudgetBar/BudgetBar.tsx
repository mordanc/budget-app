import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SubtractAmount from "./inputs/SubtractAmount";

const Bar = styled.div<{ bgColor: string; percentage: number }>`
  /* background-color: ${(props) => props.bgColor || "white"}; */
  background: ${(props) =>
    `linear-gradient(90deg, ${props.bgColor || "#ffc0cb"} ${
      props.percentage || `100`
    }%, white 0%)`};
`;
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiInputLabel: {
      // Name of the rule
      root: {
        // Some CSS
        color: "rgb(176, 168, 156)",
      },
    },
  },
});

const useStyles = makeStyles({
  root: {
    width: 120,
  },
  input: {
    color: "rgb(176, 168, 156)",
  },
  label: {
    color: "white",
  },
  test: {
    height: 36,
  },
});

function usePrevious(value): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function BudgetBar() {
  const [bgColor, setBgColor] = useState("black");
  const [percentage, setPercentage] = useState(100);
  const [title, setTitle] = useState("Food");
  const [budget, setBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(budget);
  const classes = useStyles();

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const prevBudget = usePrevious({ budget });

  // const amountLeft = ((percentage / 100) * budget).toPrecision(2);

  useEffect(() => {
    if (prevBudget?.budget < budget && budget > remainingBudget) {
      setRemainingBudget(remainingBudget + (budget - prevBudget?.budget));
    }
    const newPercentage = Math.round(remainingBudget / budget) * 100;
    setPercentage(newPercentage);
    console.log(newPercentage);
  }, [budget, remainingBudget]);

  const subtractFromBudget = (amount) => {
    setRemainingBudget(budget - amount);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: "1rem 0" }}>
        <div style={{ display: "flex" }}>
          {isEditingTitle ? (
            <TextField
              classes={{ root: classes.root }}
              InputProps={{
                className: classes.input,
              }}
              color="secondary"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
            />
          ) : (
            <span onClick={() => setIsEditingTitle(true)}>{title}</span>
          )}
          &nbsp; -&nbsp;
          {isEditingBudget ? (
            <TextField
              classes={{ root: classes.root }}
              InputProps={{
                className: classes.input,
              }}
              color="secondary"
              type="number"
              autoFocus={true}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              onBlur={() => setIsEditingBudget(false)}
            />
          ) : (
            <span onClick={() => setIsEditingBudget(true)}>{budget}</span>
          )}
        </div>
        <Bar bgColor={bgColor} percentage={percentage}>
          {remainingBudget} / {budget}
        </Bar>
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel htmlFor="color-native-simple">Color</InputLabel>
          <Select
            label={{ color: "primary" }}
            variant="filled"
            classes={{ root: classes.input, filled: classes.label }}
            style={{ color: "inherit" }}
            value={bgColor}
            // @ts-ignore
            onChange={(e) => setBgColor(e.target.value)}
            inputProps={{
              name: "color",
              id: "color-native-simple",
            }}
          >
            <MenuItem value="#010B12" style={{ cursor: "pointer" }}>
              black
            </MenuItem>
            <MenuItem value="#1261A0">blue</MenuItem>
            <MenuItem value="#D92122">red</MenuItem>
            <MenuItem value="#28A428">green</MenuItem>
            <MenuItem value="#FADA5F">yellow</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl onSubmit={(e) => e.preventDefault()}>
          <TextField
            classes={{ root: classes.test }}
            InputProps={{
              className: classes.input,
            }}
            color="secondary"
            type="number"
            autoFocus={true}
            value={budget}
            onChange={(e) => setPercentage(Number(e.target.value))}
          />
          <Button variant="contained" color="secondary">
            +
          </Button>
        </FormControl> */}
        <SubtractAmount subtractFromBudget={subtractFromBudget} />
      </div>
    </ThemeProvider>
  );
}

export default BudgetBar;
