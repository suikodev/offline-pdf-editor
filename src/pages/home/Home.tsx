import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../common/hooks";
import { HomeBanner } from "./components/HomeBanner";
import routes from "../../constants/routes.json";

export const Home: React.FC = () => {
  const history = useHistory();
  const isPdfListNotNull = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.length > 0
  );
  useEffect(() => {
    isPdfListNotNull && history.replace(routes.OVERVIEW);
  }, [isPdfListNotNull]);
  return (
    <>
      <HomeBanner />
    </>
  );
};
