import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";

export const PdfManageDrawer: React.FC<PdfManageDrawerProps> = (props) => {
  return (
    <Drawer {...props}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>All PDF</DrawerHeader>
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export type PdfManageDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
