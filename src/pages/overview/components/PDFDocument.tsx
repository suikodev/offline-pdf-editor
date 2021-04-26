import { Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export const PDFDocument: React.FC<{ file: Uint8Array; filename: string }> = (
  props
) => {
  const [numPages, setNumPages] = useState(0);
  return (
    <Document
      options={{
        cMapUrl: "cmaps/",
        cMapPacked: true,
      }}
      file={{ data: props.file }}
      onLoadSuccess={({ numPages }) => {
        setNumPages(numPages);
      }}
    >
      <Flex justifyContent="center" marginBottom="1rem">
        <Heading as="h3" size="lg">
          {props.filename}
        </Heading>
      </Flex>
      <Grid justifyItems="center" templateColumns="repeat(5, 1fr)" gap={1}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={index} width={200} pageNumber={index + 1} />
        ))}
      </Grid>
    </Document>
  );
};
