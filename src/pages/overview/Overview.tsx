import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PdfStore } from "../../common/storage";
import { Pdf } from "../../common/storage/PdfStore";
import { PdfDocument } from "./components/PdfDocument";

export const Overview: React.FC = () => {
  const [PdfFiles, setPdfFiles] = useState<Pdf[] | null>(null);
  useEffect(() => {
    const getPdfFilesFromLocalStore = async () => {
      const PdfFilesInStore: Pdf[] = [];
      await PdfStore.iterate((value) => {
        PdfFilesInStore.push(value);
      });
      setPdfFiles(PdfFilesInStore);
    };
    getPdfFilesFromLocalStore();
  }, []);
  return (
    <>
      {PdfFiles && (
        <Container as="header" maxWidth="container.xl">
          {PdfFiles.map((i) => (
            <PdfDocument key={i.id} file={i.content} filename={i.filename} />
          ))}
        </Container>
      )}
    </>
  );
};
