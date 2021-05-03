import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import routes from "../../../constants/routes.json";
import { ChoosePdfButton } from "../../../common/components/ChoosePdfButton";

export const HomeBanner: React.FC = () => {
  const history = useHistory();
  const handlePdfFileStoreSuccess = () => {
    history.replace(routes.OVERVIEW);
  };
  return (
    <Container as="section" maxWidth="container.lg">
      <Flex direction="column" align="center" paddingY={["5rem", "10rem"]}>
        <Heading textAlign="center" size="4xl">
          Edit your PDF all OFFLINE
        </Heading>
        <Text fontSize="xl" color="gray.600" textAlign="center" marginY="1rem">
          This is a PDF editor which runs in your browser totally offline after
          all page have loaded. your PDFs and your personal infomation won&#39;t
          send to any server FOREVER.
        </Text>
        <ChoosePdfButton
          onPdfStoreSuccess={handlePdfFileStoreSuccess}
          size="lg"
          colorScheme="blue"
          marginY="2rem"
        >
          choose PDF(s)
        </ChoosePdfButton>
      </Flex>
    </Container>
  );
};
