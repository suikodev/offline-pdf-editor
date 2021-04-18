import { IconButton } from "@chakra-ui/button";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import { IoLogoGithub } from "react-icons/io5";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Container as="header" maxWidth="container.xl" paddingY="1rem">
      <Flex justify="start" align="center">
        <Heading size="lg">PDF Editer</Heading>
        <Flex justify="end" flex="1">
          <IconButton
            aria-label="github link"
            variant="link"
            fontSize="2xl"
            icon={<IoLogoGithub />}
          />
        </Flex>
      </Flex>
    </Container>
  );
};
