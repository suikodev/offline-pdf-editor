import { Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { useAppSelector } from "../../common/hooks";
import { PdfDocument } from "./components/PdfDocument";
import routes from "../../constants/routes.json";

const useShouldRedirectToHomePage = () => {
  const history = useHistory();
  const isPdfListNull = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.length <= 0
  );
  useEffect(() => {
    isPdfListNull && history.replace(routes.HOME);
  }, [isPdfListNull]);
};

export const Overview: React.FC = () => {
  useShouldRedirectToHomePage();

  const pdfIdList = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.map((i) => i.id),
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
