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
import { MotionText } from "../../../common/components/motionComponents";
import { useColor } from "../../../common/hooks/useColor";

const DecorationText: React.FC = () => {
  const colors = useColor();
  const colorValue = useColorModeValue(
    [
      `linear-gradient(to left, ${colors.brand[500]}, ${colors.secondary[500]})`,
      `linear-gradient(to left, ${colors.secondary[500]}, ${colors.brand[500]})`,
    ],
    [
      `linear-gradient(to left, ${colors.brand[200]}, ${colors.secondary[200]})`,
      `linear-gradient(to left, ${colors.secondary[200]}, ${colors.brand[200]})`,
    ]
  );
  return (
    <MotionText
      fontSize="3xl"
      margin="0"
      animate={{
        background: colorValue,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
      }}
      bgClip="text"
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      ◭ ◭ ◭ ◭ ◭ ◭ ◭ ◭
    </MotionText>
  );
};

export const HomeBanner: React.FC = () => {
  const { t } = useTranslation();
  const backgroundColorValue = useColorModeValue("brand.50", "gray.700");
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
          <DecorationText />
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
