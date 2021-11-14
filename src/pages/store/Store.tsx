import { Container } from "@chakra-ui/react";
import React from "react";
import { useRedirectToHomeWhenNoPdf } from "../../common/hooks/useRedirectToHomeWhenNoPdf";

export const Store: React.FC = () => {
  useRedirectToHomeWhenNoPdf();
  return <Container></Container>;
};
