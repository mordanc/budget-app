import classes from "*.module.css";
import { FormControl, TextField, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  input: {
    color: "rgb(176, 168, 156)",
  },
  test: {
    height: 36,
  },
});

function SubtractAmount({ subtractFromBudget }) {
  const classes = useStyles();
  const [userInput, setUserInput] = useState(0);
  return (
    <FormControl onSubmit={(e) => e.preventDefault()}>
      <TextField
        classes={{ root: classes.test }}
        InputProps={{
          className: classes.input,
        }}
        color="secondary"
        type="number"
        autoFocus={true}
        value={userInput}
        onChange={(e) => setUserInput(Number(e.target.value))}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => subtractFromBudget(userInput)}
      >
        +
      </Button>
    </FormControl>
  );
}

export default SubtractAmount;
