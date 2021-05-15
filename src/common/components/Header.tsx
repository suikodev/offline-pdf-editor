import { Container, Flex, Heading, HStack } from "@chakra-ui/layout";
import {
  Button,
  Icon,
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { CgMenuMotion } from "react-icons/cg";
import { FaFileUpload } from "react-icons/fa";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoLogoGithub,
  IoMoon,
  IoSunny,
} from "react-icons/io5";
import { useAppSelector } from "../hooks";
import { usePdfPicker } from "../hooks/usePdfPicker";
import { PdfManageDrawer } from "./PdfManageDrawer";
import { ToolMenuDrawer } from "./ToolMenuDrawer";

const headerButtonStyle = {
  fontSize: "2xl",
};

const GithubButton: React.FC<{ href: string }> = ({ href }) => {
  return (
    <Tooltip label="go to github repo" hasArrow fontSize="md" placement="auto">
      <IconButton
        onClick={() => {
          window.location.href = href;
        }}
        icon={<IoLogoGithub />}
        aria-label="go to github repo"
        {...headerButtonStyle}
      />
    </Tooltip>
  );
};

const ThemeToggleButton: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(IoMoon, IoSunny);
  return (
    <Tooltip label="toggle theme" hasArrow fontSize="md" placement="auto">
      <IconButton
        onClick={toggleColorMode}
        icon={<Icon as={SwitchIcon} />}
        aria-label="toggle theme"
        {...headerButtonStyle}
      />
    </Tooltip>
  );
};

const ChoosePdfIconButton: React.FC = () => {
  const { openPdfPicker } = usePdfPicker();
  return (
    <Tooltip label="choose pdf files" hasArrow fontSize="md" placement="auto">
      <IconButton
        onClick={openPdfPicker}
        icon={<FaFileUpload />}
        aria-label="choose pdf files"
        {...headerButtonStyle}
      />
    </Tooltip>
  );
};

const OpenPdfManageDrawerButton: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <>
      <Tooltip
        label="open PDF mange menu"
        hasArrow
        fontSize="md"
        placement="auto"
      >
        <IconButton
          aria-label="open PDF manage menu"
          onClick={onToggle}
          icon={<CgMenuMotion />}
          {...headerButtonStyle}
        />
      </Tooltip>
      <PdfManageDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Header: React.FC = () => {
  const isPdfExist = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.length > 0
  );

  const {
    isOpen: isToolMenuOpen,
    onToggle: onToggleToolMenu,
    onClose: onCloseToolMenu,
  } = useDisclosure();
  return (
    <>
      <Container as="header" maxWidth="container.xl" paddingY="1rem">
        <Flex justify="start" align="center">
          <Heading size="lg">PDF Editer</Heading>
          <Button
            marginLeft="1rem"
            variant="guest"
            rightIcon={
              isToolMenuOpen ? <IoChevronUpOutline /> : <IoChevronDownOutline />
            }
            onClick={onToggleToolMenu}
          >
            All Tools
          </Button>
          <Flex justify="flex-end" flex="1">
            <HStack spacing={2} justify="center">
              <GithubButton href="https://github.com/nacht42/offline-pdf-editor" />
              <ThemeToggleButton />
              {isPdfExist && <OpenPdfManageDrawerButton />}
              {!isPdfExist && <ChoosePdfIconButton />}
            </HStack>
          </Flex>
        </Flex>
      </Container>
      <ToolMenuDrawer isOpen={isToolMenuOpen} onClose={onCloseToolMenu} />
    </>
  );
};
