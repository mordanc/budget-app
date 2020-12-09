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
import { useDispatch } from "react-redux";
import { editBudgetAmount } from "../../features/Budgets/budgetSlice";

function BudgetHeader({
  title,
  setRemainingBudget,
  remainingBudget,
  maxBudget,
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
        <EditIcon fontSize="md" />
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

        <IconButton
          // @ts-ignore
          ref={btnRef}
          onClick={onOpen}
          aria-label="Search database"
          icon={<ChevronRightIcon />}
          variant="outline"
        />
      </HStack>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // @ts-ignore
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`History for ${title}`}</DrawerHeader>

            <DrawerBody>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} color="green.500" />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} color="green.500" />
                  Assumenda, quia temporibus eveniet a libero incidunt suscipit
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} color="green.500" />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
                <ListItem>
                  <ListIcon as={ChevronRightIcon} color="green.500" />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
              </List>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Heading>
  );
}

export default BudgetHeader;
