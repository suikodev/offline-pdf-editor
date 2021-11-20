import { Container } from "@chakra-ui/react";
import React from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../common/hooks";
import { PdfDocument } from "./components/PdfDocument";
import { useRedirectToHomeWhenNoPdf } from "../../common/hooks/useRedirectToHomeWhenNoPdf";

export const Overview: React.FC = () => {
  useRedirectToHomeWhenNoPdf();

  const pdfIdList = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList?.map((i) => i.id) || [],
    shallowEqual
  );

  return (
    <Container as="header" maxWidth="container.xl">
      {pdfIdList.map((id) => (
        <PdfDocument key={id} pdfId={id} />
      ))}
    </Container>
  );
};
