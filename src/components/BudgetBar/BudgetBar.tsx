import React, { useEffect, useState } from "react";
import {
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Button,
  Heading,
  Flex,
  Divider,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

import ProgressBar from "../ProgressBar";
import BudgetHeader from "./BudgetHeader";
import BudgetDeleteButton from "./BudgetDeleteButton";
import { addBudgetHistory } from "../../features/Budgets/budgetSlice";

export type BudgetBarProps = {
  title: string;
  maxBudget: number;
  history?: any[];
};

export const TestInput = ({ description, setDescription }) => {
  const [text, setText] = useState("");

  return (
    <Input
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  );
};

// should show detailed view (history) maybe in drawer view
function BudgetBar({ title, maxBudget, history }: BudgetBarProps) {
  const [percentage, setPercentage] = useState(100);
  const [remainingBudget, setRemainingBudget] = useState(maxBudget);
  const [userInput, setUserInput] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const newPercentage = (remainingBudget / maxBudget) * 100;
    setPercentage(newPercentage);
  }, [remainingBudget, maxBudget]);

  const subtractFromBudget = () => {
    const newRemainingBudget = remainingBudget - userInput;
    if (newRemainingBudget < 0) return;

    dispatch(addBudgetHistory({ title, description, amount: userInput }));
    setRemainingBudget(newRemainingBudget);
    setDescription("");
  };

  return (
    <Stack spacing="1rem">
      <Flex justify="space-between">
        <HStack>
          <Heading size="lg">{title}</Heading>
          <BudgetDeleteButton title={title} />
        </HStack>
        <BudgetHeader
          title={title}
          remainingBudget={remainingBudget}
          setRemainingBudget={setRemainingBudget}
          maxBudget={maxBudget}
          history={history}
        />
      </Flex>
      <ProgressBar percentage={percentage} />
      <HStack justify="space-between">
        <NumberInput
          onChange={(valueString) => setUserInput(Number(valueString))}
          max={maxBudget}
          min={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <TestInput setDescription={setDescription} description={description} /> */}
        <HStack>
          <Button onClick={subtractFromBudget} colorScheme="red" size="md">
            Subtract
          </Button>
        </HStack>
      </HStack>
      <Divider />
    </Stack>
  );
}

export default BudgetBar;
