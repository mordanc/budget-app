import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Progress,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Stack,
  Button,
  Heading,
  Flex,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  useToast,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  editBudgetAmount,
  removeBudget,
} from "../../features/Budgets/budgetSlice";

export type BudgetBarProps = {
  title: string;
  maxBudget: number;
};

function Toast({ title, description, status }) {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}

function BudgetBar({ title, maxBudget }: BudgetBarProps) {
  const [percentage, setPercentage] = useState(100);
  const [remainingBudget, setRemainingBudget] = useState(maxBudget);
  const [userInput, setUserInput] = useState(0);

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    setPercentage((remainingBudget / maxBudget) * 100);
  }, [remainingBudget, maxBudget]);

  return (
    <Stack spacing="1rem">
      <Flex justify="space-between">
        <HStack>
          <Heading size="lg">{title}</Heading>
          <Popover size="sm" colorScheme='blue'>
            <PopoverTrigger>
              <CloseButton />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Are you sure?</PopoverHeader>
              <PopoverBody>
                <Button
                  colorScheme="red"
                  onClick={() => dispatch(removeBudget(title))}
                >
                  Yes
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* <CloseButton onClick={() => dispatch(removeBudget(title))} /> */}
        </HStack>
        <Heading>
          <HStack>
            <Editable
              onChange={(val) => {
                const newValue = Number(val);
                if (newValue) {
                  setRemainingBudget(newValue);
                } else {
                  toast({
                    title: "Enter a number for budget amount",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
              value={String(remainingBudget)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            <span>/</span>
            <Editable
              onChange={(val) => {
                const newValue = Number(val);
                if (newValue) {
                  dispatch(editBudgetAmount({ title, maxBudget: newValue }));
                } else {
                  toast({
                    title: "Enter a number for budget amount",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
              value={String(maxBudget)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            <EditIcon fontSize="md" />
          </HStack>
        </Heading>
      </Flex>
      <Progress value={percentage} />
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
          <Button
            onClick={() => {
              const newRemainingBudget = remainingBudget - userInput;
              if (newRemainingBudget < 0) return;
              setRemainingBudget(newRemainingBudget);
            }}
            colorScheme="red"
            size="md"
          >
            Subtract
          </Button>
          <Button
            onClick={() => {
              const newRemainingBudget = remainingBudget + userInput;
              if (newRemainingBudget > maxBudget) return;
              setRemainingBudget(newRemainingBudget);
            }}
            colorScheme="blue"
            size="md"
          >
            Add
          </Button>
        </HStack>
      </HStack>
    </Stack>
  );
}

export default BudgetBar;
