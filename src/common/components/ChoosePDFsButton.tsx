import React, { useState } from "react";
import { SelectFileButton, SelectFileButtonProps } from "./SelectFileButton";
import { nanoid } from "@reduxjs/toolkit";
import { useHistory } from "react-router";
import router from "../../constants/routes.json";
import { PdfStore } from "../storage";
import { Pdf } from "../storage/PdfStore";

/**
 * click the button to choose pdf files, then files will store in browser
 */
export const ChoosePDFButton: React.FC<ChoosePDFsButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handlePDFSelect = async (files: FileList) => {
    const PDFUint8Array = new Uint8Array(await files[0].arrayBuffer());
    setIsLoading(true);
    const pdfId = nanoid();
    const pdf: Pdf = {
      id: pdfId,
      filename: files[0].name,
      content: PDFUint8Array,
    };
    await PdfStore.setItem(pdfId, pdf);
    setIsLoading(false);
    history.push(router.OVERVIEW);
  };
  return (
    <SelectFileButton
      isLoading={isLoading}
      accept="application/pdf"
      multiple
      onFilesSelected={handlePDFSelect}
      {...props}
    ></SelectFileButton>
  );
};

type ChoosePDFsButtonProps =
  | {
      /**
       * callback when PDF is stored on browser successfully.
       */
      onPdfStoreSuccess?: () => void;
      /**
       * callback when PDF fail to be store on browser.
       */
      onPdfStoreError?: () => void;
    }
  | Omit<SelectFileButtonProps, "onFilesSelected" | "accept">;
