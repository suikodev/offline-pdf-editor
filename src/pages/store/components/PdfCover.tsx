import React, { useEffect } from "react";
import { usePdfFileById } from "../../../common/hooks/usePdfFileById";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Box, Flex, Skeleton, Text, Tooltip } from "@chakra-ui/react";
import { PDFDocument } from "pdf-lib";
import { Pdf } from "../../../common/storage/PdfStore";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const useCompatiblePageWidth = (
  pdf: Pdf | undefined,
  size: { width: number; height: number }
) => {
  const [pageWidth, setPageWidth] = React.useState<number>();
  useEffect(() => {
    if (!pdf) return;
    PDFDocument.load(pdf.data).then((doc) => {
      const pdfSize = doc.getPage(0).getSize();
      const pdfRadio = pdfSize.width / pdfSize.height;
      const boxRadio = size.width / size.height;
      setPageWidth(boxRadio > pdfRadio ? size.height * pdfRadio : size.width);
    });
  }, [pdf]);
  return pageWidth;
};

const PdfCover: React.FC<PdfCoverProps> = (props) => {
  const { pdfId, width, height } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);

  const pdfFile = usePdfFileById(pdfId, []);

  const pageWidth = useCompatiblePageWidth(pdfFile, { width, height });

  return (
    <Box width={width} overflow="hidden">
      <Skeleton
        as={Flex}
        height={height}
        isLoaded={isLoaded}
        alignItems="center"
        justifyContent="center"
      >
        {pdfFile && (
          <Document
            options={{
              cMapUrl: "cmaps/",
              cMapPacked: true,
            }}
            file={pdfFile}
            loading={<></>}
          >
            {pageWidth && (
              <Page
                width={pageWidth}
                pageNumber={1}
                loading={<></>}
                onLoadSuccess={() => setIsLoaded(true)}
              />
            )}
          </Document>
        )}
      </Skeleton>
      <Skeleton isLoaded={isLoaded}>
        <Tooltip label={pdfFile?.filename}>
          <Text whiteSpace="nowrap" fontWeight="bold">
            {pdfFile?.filename}
          </Text>
        </Tooltip>
      </Skeleton>
    </Box>
  );
};

type PdfCoverProps = {
  pdfId: string;
  width: number;
  height: number;
};

export default React.memo(PdfCover);
