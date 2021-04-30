import React, { useState } from "react";
import { SelectFileButton, SelectFileButtonProps } from "./SelectFileButton";
import { useAppDispatch } from "../hooks";
import { concat } from "../../features/pdfInfo/pdfInfoSlice";

/**
 * click the button to choose pdf files, then files will store in browser
 */
export const ChoosePdfButton: React.FC<ChoosePdfButtonProps> = (props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    onPdfStoreError,
    onPdfStoreSuccess,
    ...selectFileButtonProps
  } = props;

  const handlePdfSelect = async (files: FileList) => {
    try {
      const PdfUint8Array = new Uint8Array(await files[0].arrayBuffer());
      setIsLoading(true);
      const pdf = {
        filename: files[0].name,
        content: PdfUint8Array,
      };
      dispatch(concat([pdf]));
      setIsLoading(false);
      onPdfStoreSuccess?.();
    } catch (e) {
      onPdfStoreError?.(e);
    }
  };
  return (
    <SelectFileButton
      isLoading={isLoading}
      accept="application/pdf"
      multiple
      onFilesSelected={handlePdfSelect}
      {...selectFileButtonProps}
    ></SelectFileButton>
  );
};

type ChoosePdfButtonProps = {
  /**
   * callback when PDF is stored on browser successfully.
   */
  onPdfStoreSuccess?: () => void;
  /**
   * callback when PDF fail to be store on browser.
   */
  onPdfStoreError?: (error: Error) => void;
} & Omit<SelectFileButtonProps, "onFilesSelected" | "accept">;
