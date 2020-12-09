import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React from "react";

function SubtractButton({ maxBudget }) {
  return (
    <Popover size="lg" colorScheme="blue">
      <PopoverTrigger>
        <Button>Something</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Enter an amount</PopoverHeader>
        <PopoverBody>
          <Stack spacing="4px">
            <NumberInput max={maxBudget} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Button>Submit</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default SubtractButton;
