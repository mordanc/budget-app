import React from "react";
import {
  Popover,
  PopoverTrigger,
  CloseButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeBudget } from "../../features/Budgets/budgetSlice";

function BudgetDeleteButton({ title }) {
  const dispatch = useDispatch();
  return (
    <Popover size="sm" colorScheme="blue">
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
  );
}

export default BudgetDeleteButton;
