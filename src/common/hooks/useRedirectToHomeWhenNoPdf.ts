import { useUpdateEffect } from "react-use";
import { useHistory } from "react-router-dom";
import { useAppSelector } from ".";
import routes from "../../constants/routes.json";

export const useRedirectToHomeWhenNoPdf = () => {
  const history = useHistory();
  const isPdfListEmpty = useAppSelector((state) =>
    state.pdfInfo.pdfInfoList?.length === 0 ? true : false
  );
  console.log("isPdfListEmpty", isPdfListEmpty);
  useUpdateEffect(() => {
    isPdfListEmpty && history.replace(routes.HOME);
  }, [isPdfListEmpty]);
};
