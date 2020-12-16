import React, { useEffect, useState } from "react";

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
  Avatar,
} from "@chakra-ui/react";
import BudgetBar from "./components/BudgetBar/BudgetBar";
import AddBudgetModal from "./components/AddBudgetModal";
import { addBudget, selectBudgets } from "./features/Budgets/budgetSlice";
import { batch, useDispatch, useSelector } from "react-redux";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const budgets = useSelector(selectBudgets);
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  useEffect(() => {
    console.log({ user });
  }, [user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
      {/* <Container mt="0.5rem" id="navbar"> */}
      <HStack mx="1rem" mt="0.5rem" justify="space-between">
        <Heading>Simple Budget</Heading>
        {isAuthenticated ? (
          <Popover trigger="hover" placement="left">
            <PopoverTrigger>
              <Avatar name={user.name} src={user.picture} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        )}
      </HStack>
      <Container mt={"5%"}>
        {isAuthenticated && (
          <>
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
              {budgets.map(({ title, maxBudget, history }) => (
                <BudgetBar
                  key={title}
                  title={title}
                  maxBudget={maxBudget}
                  history={history}
                />
              ))}
            </Stack>
            <AddBudgetModal isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
