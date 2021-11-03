import { Container } from "@chakra-ui/layout";
import React from "react";
import { useIfShouldRedirectToHomePage } from "../../common/hooks/useIfShouldRedirectToHomePage";

export const Store: React.FC = () => {
  useIfShouldRedirectToHomePage();
  return <Container></Container>;
};
