import { Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Pdf, PdfStore } from "../../../common/storage/PdfStore";

export const PdfDocument: React.FC<{ pdfId: string }> = (props) => {
  const [pdfFile, setPdfFile] = useState<Pdf>();
  useEffect(() => {
    PdfStore.getItem(props.pdfId).then((pdf) => {
      pdf && setPdfFile(pdf);
    });
  }, []);

  const file = useMemo(() => ({ data: pdfFile?.content }), [pdfFile]);

  const [numPages, setNumPages] = useState(0);
  return (
    <>
      {pdfFile && (
        <Document
          options={{
            cMapUrl: "cmaps/",
            cMapPacked: true,
          }}
          file={file}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
        >
          <Flex justifyContent="center" marginBottom="1rem">
            <Heading as="h3" size="lg">
              {pdfFile.filename}
            </Heading>
          </Flex>
          <Grid justifyItems="center" templateColumns="repeat(5, 1fr)" gap={1}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={index} width={200} pageNumber={index + 1} />
            ))}
          </Grid>
        </Document>
      )}
    </>
  );
};
