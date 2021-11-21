import { useUpdateEffect } from "react-use";
import { useHistory } from "react-router-dom";
import { useAppSelector } from ".";
import routes from "../../constants/routes.json";

export const useRedirectToHomeWhenNoPdf = () => {
  const history = useHistory();
  const isPdfListEmpty = useAppSelector((state) =>
    state.pdfList.data?.length === 0 ? true : false
  );
  useUpdateEffect(() => {
    isPdfListEmpty && history.replace(routes.HOME);
  }, [isPdfListEmpty]);
};
