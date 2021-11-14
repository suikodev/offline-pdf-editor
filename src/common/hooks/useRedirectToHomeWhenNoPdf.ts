import { useUpdateEffect } from "react-use";
import { useHistory } from "react-router-dom";
import { useAppSelector } from ".";
import routes from "../../constants/routes.json";

export const useRedirectToHomeWhenNoPdf = () => {
  const history = useHistory();
  const isPdfListNull = useAppSelector(
    (state) => state.pdfInfo.pdfInfoList.length <= 0
  );
  useUpdateEffect(() => {
    isPdfListNull && history.replace(routes.HOME);
  }, [isPdfListNull]);
};
