import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from ".";
import routes from "../../constants/routes.json";

export const useIfShouldRedirectToHomePage = () => {
  const history = useHistory();
  const isPdfListNull = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.length <= 0
  );
  useEffect(() => {
    isPdfListNull && history.replace(routes.HOME);
  }, [isPdfListNull]);
};
