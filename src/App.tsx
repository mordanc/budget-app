import React, { useState } from "react";

import "./App.css";
import {
  Container,
  Heading,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import BudgetBar from "./components/BudgetBar/BudgetBar";
import AddBudgetModal from "./components/AddBudgetModal";
import { selectBudgets } from "./features/Budgets/budgetSlice";
import { useSelector } from "react-redux";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const budgets = useSelector(selectBudgets);
  return (
    <div className="App">
      <Container mt={"10%"}>
        <Heading mb={"2rem"}>Budget App</Heading>
        <Button mb={"2rem"} colorScheme="blue" onClick={onOpen} mt={3}>
          Add Budget
        </Button>
        <Stack spacing="2rem">
          {budgets.map(({ title, maxBudget }) => (
            <div>
              <BudgetBar title={title} maxBudget={maxBudget} />
            </div>
          ))}
        </Stack>

        <AddBudgetModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </div>
  );
}

export default App;
