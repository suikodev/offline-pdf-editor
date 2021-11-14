import React from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../common/hooks";
import { HomeBanner } from "./components/HomeBanner";
import routes from "../../constants/routes.json";
import { useUpdateEffect } from "react-use";

const useShouldRedirectToOverviewPage = () => {
  const history = useHistory();
  const isPdfListNull = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.length <= 0
  );
  useUpdateEffect(() => {
    !isPdfListNull && history.replace(routes.OVERVIEW);
  }, [isPdfListNull]);
};

export const Home: React.FC = () => {
  useShouldRedirectToOverviewPage();
  return (
    <>
      <HomeBanner />
    </>
  );
};
