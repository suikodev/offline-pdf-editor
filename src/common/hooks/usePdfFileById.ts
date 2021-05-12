import { useState, useEffect } from "react";
import { PdfStore } from "../storage";
import { Pdf } from "../storage/PdfStore";

export const usePdfFileById = (pdfId: string, deps: React.DependencyList) => {
  const [pdfFile, setPdfFile] = useState<Pdf>();
  useEffect(() => {
    PdfStore.getItem(pdfId).then((pdf) => {
      pdf && setPdfFile(pdf);
    });
  }, deps);

  return pdfFile;
};
