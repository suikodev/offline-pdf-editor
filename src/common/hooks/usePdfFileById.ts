import { useState, useEffect, useMemo } from "react";
import { PdfStore } from "../storage";
import { Pdf } from "../storage/PdfStore";

export const usePdfFileById = (pdfId: string, deps: React.DependencyList) => {
  const [pdf, setPdf] = useState<Pdf>();
  useEffect(() => {
    PdfStore.getItem(pdfId).then((pdf) => {
      pdf && setPdf(pdf);
    });
  }, deps);

  const pdfFile = useMemo(() => pdf, [pdf?.id]);
  return pdfFile;
};
