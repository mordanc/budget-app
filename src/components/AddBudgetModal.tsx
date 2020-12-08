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
  FormHelperText,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBudget } from "../features/Budgets/budgetSlice";

function AddBudgetModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [maxBudget, setMaxBudget] = useState(0);

  const dispatch = useDispatch();

  return (
    <Modal colorScheme="black" size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired id="title">
            <FormLabel>Budget Name</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} type="text" />
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
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              dispatch(addBudget({ title, maxBudget }));
              onClose();
            }}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddBudgetModal;
