import { Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PDFStore } from "../../common/storage";
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
      await PDFStore.iterate<
        { filename: string; content: Uint8Array },
        unknown
      >((value, key) => {
        console.log("pdfId:", key);
        PDFFIlesInStore.push({
          id: key,
          ...value,
        });
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
