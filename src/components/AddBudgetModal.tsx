import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  FormErrorMessage,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addBudget, selectBudgetTitles } from "../features/Budgets/budgetSlice";

function AddBudgetModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [maxBudget, setMaxBudget] = useState(0);
  const [invalidForm, setInvalidForm] = useState(false);

  const existingTitles = useSelector(selectBudgetTitles);

  const ref = useRef();

  const dispatch = useDispatch();

  const reset = () => {
    setTitle("");
    setMaxBudget(0);
    setInvalidForm(false);
    onClose();
  };

  const onClickAdd = () => {
    if (invalidForm) {
      return;
    }
    dispatch(addBudget({ title, maxBudget }));
    onClose();
  };

  return (
    <Modal
      //@ts-ignore
      initialFocusRef={ref}
      colorScheme="black"
      size="lg"
      isOpen={isOpen}
      onClose={reset}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired id="title" isInvalid={invalidForm}>
            <FormLabel>Budget Name</FormLabel>
            <Input
              //@ts-ignore
              ref={ref}
              autoFocus={true}
              onChange={(e) => {
                const { value } = e?.target || {};
                if (existingTitles.includes(value)) {
                  setInvalidForm(true);
                  return;
                }
                setInvalidForm(false);
                setTitle(e.target.value);
              }}
              type="text"
            />
            <FormErrorMessage>That name already exists</FormErrorMessage>
          </FormControl>
          <FormControl isRequired id="title">
            <FormLabel>Budget Amount</FormLabel>
            <Input
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              type="number"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <VStack width="full">
            <Flex>
              <Button colorScheme="red" mr={3} onClick={reset}>
                Close
              </Button>
              <Button
                disabled={invalidForm}
                colorScheme="green"
                onClick={() => onClickAdd()}
              >
                Add
              </Button>
            </Flex>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddBudgetModal;
