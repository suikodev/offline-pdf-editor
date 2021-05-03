import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { useAppSelector } from "../../common/hooks";
import { PdfDocument } from "./components/PdfDocument";
import routes from "../../constants/routes.json";

export const Overview: React.FC = () => {
  const history = useHistory();

  const pdfIdList = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.map((i) => i.id),
    shallowEqual
  );

  useEffect(() => {
    if (pdfIdList.length <= 0) {
      history.replace(routes.HOME);
    }
  }, [pdfIdList]);

  return (
    <Container as="header" maxWidth="container.xl">
      {pdfIdList.map((id) => (
        <PdfDocument key={id} pdfId={id} />
      ))}
    </Container>
  );
};
