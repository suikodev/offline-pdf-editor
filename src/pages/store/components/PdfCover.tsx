import React, { useEffect, useRef } from "react";
import { usePdfFileById } from "../../../common/hooks/usePdfFileById";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Box, Flex, Skeleton, Tooltip } from "@chakra-ui/react";
import { PDFDocument } from "pdf-lib";
import { Pdf } from "../../../common/storage/PdfStore";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { MotionText } from "../../../common/components/motionComponents";
import { useColor } from "../../../common/hooks/useColor";

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
  const ref = useRef<HTMLParagraphElement>(null);

  const pdfFile = usePdfFileById(pdfId, []);

  const pageWidth = useCompatiblePageWidth(pdfFile, { width, height });

  const colors = useColor();

  return (
    <Box width={width}>
      <Skeleton
        as={Flex}
        height={height}
        isLoaded={isLoaded}
        alignItems="center"
        justifyContent="center"
        outline={`1px ${colors.brand[300]} solid`}
        boxShadow={` 6px 6px ${colors.brand[200]} `}
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
      <Skeleton
        display="flex"
        isLoaded={isLoaded}
        marginTop="8px"
        overflow="hidden"
      >
        <Tooltip label={pdfFile?.filename}>
          <MotionText
            ref={ref}
            whileHover={
              (ref.current?.clientWidth || 0) > width
                ? {
                    x: [0, -((ref.current?.clientWidth || 0) - width)],
                    transition: {
                      duration: ((ref.current?.clientWidth || 0) - width) / 50,
                      repeatDelay: 0.5,
                      velocity: 0.1,
                      type: "spring",
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }
                : undefined
            }
            whiteSpace="nowrap"
            fontWeight="bold"
          >
            {pdfFile?.filename}
          </MotionText>
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
