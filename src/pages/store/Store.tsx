import { Container } from "@chakra-ui/react";
import React from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../common/hooks";
import { useRedirectToHomeWhenNoPdf } from "../../common/hooks/useRedirectToHomeWhenNoPdf";
import PdfCover from "./components/PdfCover";

export const Store: React.FC = () => {
  useRedirectToHomeWhenNoPdf();
  const pdfIdList = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.map((i) => i.id),
    shallowEqual
  );
  return (
    <Container>
      {pdfIdList.map((id) => (
        <PdfCover pdfId={id} key={id} />
      ))}
    </Container>
  );
};
