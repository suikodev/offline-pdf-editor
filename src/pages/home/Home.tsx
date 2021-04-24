import React from "react";
import { Header } from "../../common/components/Header";
import { HomeBanner } from "./components/HomeBanner";

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HomeBanner />
    </>
  );
};
