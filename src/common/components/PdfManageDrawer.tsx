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
  Flex,
  Text,
  IconButton,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { IoTrash } from "react-icons/io5";
import { RootState } from "../../app/store";
import { PdfInfo, remove } from "../../features/pdfInfo/pdfInfoSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const selectPdfById = (state: RootState, id: string) =>
  state.pdfInfo.pdfInfoList.find((i) => i.id === id);

const PdfManageListItem: React.FC<{ id: string }> = (props) => {
  const { filename, id: pdfId } = useAppSelector((state) =>
    selectPdfById(state, props.id)
  ) as PdfInfo;

  const dispatch = useAppDispatch();
  const removePdf = () => dispatch(remove([pdfId]));
  return (
    <ListItem>
      <Flex justifyContent="space-between" align="center">
        <Text fontSize="xl" isTruncated>
          {filename}
        </Text>
        <HStack>
          <Tooltip
            label={`delete ${filename}`}
            hasArrow
            fontSize="md"
            placement="auto"
          >
            <IconButton
              onClick={removePdf}
              icon={<IoTrash />}
              aria-label={`delete ${filename}`}
              colorScheme="red"
              size="sm"
            />
          </Tooltip>
        </HStack>
      </Flex>
    </ListItem>
  );
};

export const PdfManageDrawer: React.FC<PdfManageDrawerProps> = (props) => {
  const pdfIdList = useAppSelector((state) =>
    state.pdfInfo.pdfInfoList.map((i) => i.id)
  );

  return (
    <Drawer {...props}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>All PDF</DrawerHeader>
          <DrawerBody>
            <Stack>
              <List>
                {pdfIdList.map((i) => (
                  <PdfManageListItem key={i} id={i} />
                ))}
              </List>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export type PdfManageDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
