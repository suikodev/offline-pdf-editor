import { FormEvent, useEffect, useState } from "react";
import { concat } from "../../features/pdfInfo/pdfInfoSlice";
import { Pdf } from "../storage/PdfStore";
import { useAppDispatch } from "./useAppDispatch";

export const usePdfPicker = (
  handlePdfStoreSuccess?: () => void,
  handlePdfStoreError?: (e: Error) => void
) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();

  const onFilesSelected = async (e: Event) => {
    setIsLoading(true);
    const files = ((e as unknown) as FormEvent<HTMLInputElement>).currentTarget
      .files;
    if (!files) return;
    const pdfInfoList: Omit<Pdf, "id">[] = [];
    try {
      for (const file of Array.from(files)) {
        pdfInfoList.push({
          filename: file.name,
          content: new Uint8Array(await file.arrayBuffer()),
        });
      }

      dispatch(concat(pdfInfoList));

      setInputElement((element) => {
        if (element) {
          element.value = "";
        }
        return element;
      });

      setIsLoading(false);
      handlePdfStoreSuccess?.();
    } catch (e) {
      setIsLoading(false);
      handlePdfStoreError?.(e);
    }
  };

  useEffect(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.multiple = true;
    input.onchange = onFilesSelected;
    setInputElement(input);
  }, []);
  return { openPdfPicker: inputElement?.click.bind(inputElement), isLoading };
};
