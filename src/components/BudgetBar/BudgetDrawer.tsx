import React, { useEffect } from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  ListIcon,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectBudgetByName } from "../../features/Budgets/budgetSlice";

function BudgetDrawer({ isOpen, onClose, btnRef, title }) {
  const { history } = useSelector(selectBudgetByName(title)) || {};

  useEffect(() => {
    console.log("## re-render");
  });

  return (
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
            {history ? (
              <List spacing={3}>
                {history?.map((item) => (
                  <ListItem>
                    <ListIcon as={ChevronRightIcon} color="green.500" />
                    {`${item.amount} - ${item.description || "No Description"}`}
                  </ListItem>
                ))}
              </List>
            ) : (
              "No budget history yet"
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default BudgetDrawer;
