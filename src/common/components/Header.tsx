import { Container, Flex, Heading, HStack, LinkProps } from "@chakra-ui/layout";
import React from "react";
import {
  Link,
  Icon,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";

type GithubLinkProps = {
  href: string;
} & Omit<LinkProps, "aria-label" | "onClick" | "icon">;

const GithubLink: React.FC<GithubLinkProps> = (props) => {
  const { href } = props;
  return (
    <Link aria-label="github link" href={href}>
      <Icon w={6} h={6} as={IoLogoGithub} />
    </Link>
  );
};

type ThemeToggleButtonProps = Omit<
  IconButtonProps,
  "aria-label" | "onClick" | "icon"
>;

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(IoMoon, IoSunny);
  return (
    <IconButton
      aria-label="toggle theme"
      onClick={toggleColorMode}
      variant="ghost"
      fontSize="2xl"
      icon={<Icon as={SwitchIcon} />}
      {...props}
    />
  );
};

export const Header: React.FC = () => {
  return (
    <Container as="header" maxWidth="container.xl" paddingY="1rem">
      <Flex justify="start" align="center">
        <Heading size="lg">PDF Editer</Heading>
        <Flex justify="end" flex="1">
          <HStack spacing={2}>
            <GithubLink href="https://github.com/nacht42/offline-pdf-editor" />
            <ThemeToggleButton />
          </HStack>
        </Flex>
      </Flex>
    </Container>
  );
};
