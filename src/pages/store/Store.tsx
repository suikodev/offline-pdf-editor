import { Box, Container, Grid } from "@chakra-ui/react";
import React from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../common/hooks";
import { useRedirectToHomeWhenNoPdf } from "../../common/hooks/useRedirectToHomeWhenNoPdf";
import PdfCover from "./components/PdfCover";

export const Store: React.FC = () => {
  useRedirectToHomeWhenNoPdf();
  const pdfIdList = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList?.map((i) => i.id) || [],
    shallowEqual
  );
  return (
    <Box as="section" paddingY="16px">
      <Container as="section" maxW="container.xl">
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
