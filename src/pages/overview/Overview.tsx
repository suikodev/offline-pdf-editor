import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PdfStore } from "../../common/storage";
import { PDFDocument } from "./components/PDFDocument";

type PDF = {
  id: string;
  filename: string;
  content: Uint8Array;
};

export const Overview: React.FC = () => {
  const [PDFFiles, setPDFFiles] = useState<PDF[] | null>(null);
  console.log(PDFFiles?.length);
  useEffect(() => {
    const getPDFs = async () => {
      const PDFFIlesInStore: PDF[] = [];
      await PdfStore.iterate((value, key) => {
        console.log("pdfId:", key);
        PDFFIlesInStore.push(value);
      });
      setPDFFiles(PDFFIlesInStore);
    };
    getPDFs();
  }, []);
  return PDFFiles === null ? (
    <></>
  ) : (
    <Container as="header" maxWidth="container.xl">
      {PDFFiles.map((i) => (
        <PDFDocument key={i.id} file={i.content} filename={i.filename} />
      ))}
    </Container>
  );
};
