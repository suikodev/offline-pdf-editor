import { Box, Container, Grid, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { shallowEqual } from "react-redux";
import {
  MotionFlex,
  MotionHeading,
} from "../../common/components/motionComponents";
import { useAppSelector } from "../../common/hooks";
import { useColor } from "../../common/hooks/useColor";
import { useRedirectToHomeWhenNoPdf } from "../../common/hooks/useRedirectToHomeWhenNoPdf";
import PdfCover from "./components/PdfCover";

export const Store: React.FC = () => {
  useRedirectToHomeWhenNoPdf();
  const pdfIdList = useAppSelector(
    (state) => state.pdfList.data?.map((i) => i.id) || [],
    shallowEqual
  );
  const colors = useColor();
  const headingBackgroundColor = useColorModeValue(
    colors.brand[50],
    colors.gray[700]
  );
  const headingColor = useColorModeValue(colors.black, colors.secondary[50]);
  return (
    <Box as="section">
      <MotionFlex
        backgroundColor={headingBackgroundColor}
        justifyContent="center"
        padding="16px"
      >
        <MotionHeading color={headingColor}>PDF store</MotionHeading>
      </MotionFlex>
      <Container maxW="container.xl" paddingY="16px">
        <Grid
          width="100%"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          justifyItems="center"
        >
          {pdfIdList.map((id) => (
            // use A4 paper size
            <PdfCover key={id} pdfId={id} width={210} height={297} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
