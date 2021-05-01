import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  List,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../hooks";

export const PdfManageDrawer: React.FC<PdfManageDrawerProps> = (props) => {
  const pdfInfoList = useAppSelector((state) => state.pdfInfo.pdfInfoList);

  return (
    <Drawer {...props}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>All PDF</DrawerHeader>
          <Stack>
            <List>
              {pdfInfoList.map((i) => (
                <ListItem key={i.id}>{i.filename}</ListItem>
              ))}
            </List>
          </Stack>
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
