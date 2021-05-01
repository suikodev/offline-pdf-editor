import { FormEvent, useEffect, useState } from "react";
import { concat } from "../../features/pdfInfo/pdfInfoSlice";
import { Pdf } from "../storage/PdfStore";
import { useAppDispatch } from "./useAppDispatch";

export const usePdfPicker = (
  handlePdfStoreSuccess?: () => void,
  handlePdfStoreError?: (e: Error) => void
) => {
  const dispatch = useAppDispatch();
  const onFilesSelected = async (e: Event) => {
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
      handlePdfStoreSuccess?.();
    } catch (e) {
      handlePdfStoreError?.(e);
    }
  };

  const [inputElement, setInputElement] = useState<HTMLInputElement>();

  useEffect(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.multiple = true;
    input.onchange = onFilesSelected;
    setInputElement(input);
  }, []);
  return inputElement?.click.bind(inputElement);
};
