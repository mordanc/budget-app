import React, { useState } from "react";

import "./App.css";
import {
  Container,
  Heading,
  Stack,
  Button,
  useDisclosure,
  Divider,
  Flex,
  Center,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import BudgetBar from "./components/BudgetBar/BudgetBar";
import AddBudgetModal from "./components/AddBudgetModal";
import { addBudget, selectBudgets } from "./features/Budgets/budgetSlice";
import { batch, useDispatch, useSelector } from "react-redux";
import { InfoOutlineIcon } from "@chakra-ui/icons";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const budgets = useSelector(selectBudgets);
  return (
    <div className="App">
      <Container mt={"5%"}>
        <HStack mb={"2rem"}>
          <Heading>My Budget</Heading>

          <Popover trigger="hover">
            <PopoverTrigger>
              <InfoOutlineIcon />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Information</PopoverHeader>
              <PopoverBody>
                <ul>
                  <li>Click on the budget amounts to edit them</li>
                  <li>
                    Click on the 'x' next to a budget item's name to delete it
                  </li>
                  <li>Click on the color of a budget item to change it</li>
                </ul>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
        <Button
          width="full"
          mb={"2rem"}
          colorScheme="blue"
          onClick={onOpen}
          mt={3}
        >
          Add Budget Item
        </Button>

        <Button
          width="full"
          mb={"2rem"}
          colorScheme="blue"
          onClick={() => {
            batch(() => {
              dispatch(addBudget({ title: "Groceries", maxBudget: 100 }));
              dispatch(addBudget({ title: "Eating Out", maxBudget: 200 }));
              dispatch(addBudget({ title: "Furniture", maxBudget: 300 }));
              dispatch(addBudget({ title: "Movies", maxBudget: 50 }));
              dispatch(addBudget({ title: "Games", maxBudget: 150 }));
            });
          }}
          mt={3}
        >
          Quick Fill
        </Button>
        <Stack spacing="3rem">
          {budgets.map(({ title, maxBudget }, index) => (
            <BudgetBar key={title} title={title} maxBudget={maxBudget} />
          ))}
        </Stack>

        <AddBudgetModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </div>
  );
}

export default App;
