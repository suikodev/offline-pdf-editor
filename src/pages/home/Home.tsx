import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../common/hooks";
import { HomeBanner } from "./components/HomeBanner";
import routes from "../../constants/routes.json";

const useShouldRedirectToStorePage = () => {
  const history = useHistory();
  const isPdfListEmpty = useAppSelector(
    (state) => (state.pdfList.data?.length || 0) === 0
  );
  useEffect(() => {
    !isPdfListEmpty && history.replace(routes.STORE);
  }, [isPdfListEmpty]);
};

export const Home: React.FC = () => {
  useShouldRedirectToStorePage();
  return (
    <>
      <HomeBanner />
    </>
  );
};
