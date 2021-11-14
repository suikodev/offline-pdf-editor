import React, { useMemo } from "react";
import { usePdfFileById } from "../../../common/hooks/usePdfFileById";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PdfCover: React.FC<PdfCoverProps> = (props) => {
  const pdfFile = usePdfFileById(props.pdfId, []);
  const memorizedFile = useMemo(() => ({ data: pdfFile?.content }), [pdfFile]);

  return (
    <>
      {pdfFile && (
        <Document
          options={{
            cMapUrl: "cmaps/",
            cMapPacked: true,
          }}
          file={memorizedFile}
        >
          <Page pageNumber={1} />
        </Document>
      )}
    </>
  );
};

type PdfCoverProps = {
  pdfId: string;
};

export default PdfCover;
