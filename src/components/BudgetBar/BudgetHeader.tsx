import { EditIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  useToast,
  Heading,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  useDisclosure,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editBudgetAmount,
  selectBudgets,
} from "../../features/Budgets/budgetSlice";
import BudgetDrawer from "./BudgetDrawer";

function BudgetHeader({
  title,
  setRemainingBudget,
  remainingBudget,
  maxBudget,
  history,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const btnRef = React.useRef();

  const editBudgetHandler = (val, type) => {
    const newValue = Number(val);
    if (newValue) {
      type === "max"
        ? dispatch(editBudgetAmount({ title, maxBudget: newValue }))
        : setRemainingBudget(newValue);
    } else {
      toast({
        title: "Enter a number for budget amount",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Heading>
      <HStack>
        <Editable
          onChange={(val) => editBudgetHandler(val, "remaining")}
          value={String(remainingBudget)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <span>/</span>
        <Editable
          onChange={(val) => editBudgetHandler(val, "max")}
          value={String(maxBudget)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        {/* <EditIcon fontSize="md" /> */}

        <IconButton
          // @ts-ignore
          ref={btnRef}
          onClick={onOpen}
          aria-label="Search database"
          icon={<ChevronRightIcon />}
          variant="outline"
        />
      </HStack>
      <BudgetDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        title={title}
      />
    </Heading>
  );
}

export default BudgetHeader;
