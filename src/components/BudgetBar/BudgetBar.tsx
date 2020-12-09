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
} from "@chakra-ui/react";

import ProgressBar from "../ProgressBar";
import SubtractButton from "../SubtractButton";
import BudgetHeader from "./BudgetHeader";
import BudgetDeleteButton from "./BudgetDeleteButton";

export type BudgetBarProps = {
  title: string;
  maxBudget: number;
};

// should show detailed view (history) maybe in drawer view
function BudgetBar({ title, maxBudget }: BudgetBarProps) {
  const [percentage, setPercentage] = useState(100);
  const [remainingBudget, setRemainingBudget] = useState(maxBudget);
  const [userInput, setUserInput] = useState(0);

  useEffect(() => {
    const newPercentage = (remainingBudget / maxBudget) * 100;
    setPercentage(newPercentage);
  }, [remainingBudget, maxBudget]);

  const subtractFromBudget = () => {
    const newRemainingBudget = remainingBudget - userInput;
    if (newRemainingBudget < 0) return;
    setRemainingBudget(newRemainingBudget);
  };

  const addToBudget = () => {
    const newRemainingBudget = remainingBudget + userInput;
    if (newRemainingBudget > maxBudget) return;
    setRemainingBudget(newRemainingBudget);
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
        <HStack>
          <SubtractButton maxBudget={maxBudget} />
          <Button onClick={subtractFromBudget} colorScheme="red" size="md">
            Subtract
          </Button>
          <Button onClick={addToBudget} colorScheme="blue" size="md">
            Add
          </Button>
        </HStack>
      </HStack>
      <Divider />
    </Stack>
  );
}

export default BudgetBar;
