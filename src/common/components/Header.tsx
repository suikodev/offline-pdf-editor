import { Container, Flex, Heading, HStack } from "@chakra-ui/layout";
import React from "react";
import {
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";
import { usePdfPicker } from "../hooks/usePdfPicker";

const headerButtonStyle = {
  variant: "ghost",
  fontSize: "2xl",
  colorScheme: "gray",
};

export const GithubButton: React.FC<{ href: string }> = ({ href }) => {
  return (
    <IconButton
      onClick={() => {
        window.location.href = href;
      }}
      icon={<IoLogoGithub />}
      aria-label="go to github repo"
      {...headerButtonStyle}
    />
  );
};

export const ThemeToggleButton: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(IoMoon, IoSunny);
  return (
    <IconButton
      onClick={toggleColorMode}
      icon={<Icon as={SwitchIcon} />}
      aria-label="toggle theme"
      {...headerButtonStyle}
    />
  );
};

const ChoosePdfIconButton: React.FC = () => {
  const openPdfPicker = usePdfPicker();
  return (
    <IconButton
      onClick={openPdfPicker}
      icon={<FaFileUpload />}
      aria-label="choose pdf files"
      {...headerButtonStyle}
    />
  );
};

export const Header: React.FC = () => {
  return (
    <Container as="header" maxWidth="container.xl" paddingY="1rem">
      <Flex justify="start" align="center">
        <Heading size="lg">PDF Editer</Heading>
        <Flex justify="flex-end" flex="1">
          <HStack spacing={2} justify="center">
            <GithubButton href="https://github.com/nacht42/offline-pdf-editor" />
            <ThemeToggleButton />
            <ChoosePdfIconButton />
          </HStack>
        </Flex>
      </Flex>
    </Container>
  );
};
