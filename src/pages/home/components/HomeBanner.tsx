import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import routes from "../../../constants/routes.json";
import { ChoosePdfButton } from "../../../common/components/ChoosePdfButton";
import { useTranslation } from "react-i18next";

export const HomeBanner: React.FC = () => {
  const { t } = useTranslation();
  const backgroundColorValue = useColorModeValue("brand.50", "grey.500");
  const history = useHistory();
  const handlePdfFileStoreSuccess = () => {
    history.replace(routes.OVERVIEW);
  };
  return (
    <Box as="section" backgroundColor={backgroundColorValue}>
      <Container maxWidth="container.lg">
        <Flex direction="column" align="center" paddingY={["5rem", "10rem"]}>
          <Heading textAlign="center" size="4xl">
            {t("home.banner.title")}
          </Heading>
          <Text fontSize="xl" textAlign="center" marginY="1rem">
            {t("home.banner.description")}
          </Text>
          <ChoosePdfButton
            onPdfStoreSuccess={handlePdfFileStoreSuccess}
            size="lg"
            colorScheme="brand"
            marginY="2rem"
          >
            {t("home.banner.choosePdfButtonText")}
          </ChoosePdfButton>
        </Flex>
      </Container>
    </Box>
  );
};
