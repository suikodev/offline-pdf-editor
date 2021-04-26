import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ChoosePDFButton } from "../../../common/components/ChoosePDFsButton";

export const HomeBanner: React.FC = () => {
  return (
    <Container as="section" maxWidth="container.lg">
      <Flex direction="column" align="center" paddingY={["5rem", "10rem"]}>
        <Heading size="4xl">Edit your PDF all OFFLINE</Heading>
        <Text fontSize="xl" color="gray.600" textAlign="center" marginY="1rem">
          This is a PDF editor which runs in your browser totally offline after
          all page have loaded. your PDFs and your personal infomation won&#39;t
          send to any server FOREVER.
        </Text>
        <ChoosePDFButton size="lg" colorScheme="brand" marginY="2rem">
          choose PDF(s)
        </ChoosePDFButton>
      </Flex>
    </Container>
  );
};
