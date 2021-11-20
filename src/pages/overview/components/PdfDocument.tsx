import {
  Box,
  Flex,
  Heading,
  HTMLChakraProps,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { PageProps } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { usePdfFileById } from "../../../common/hooks/usePdfFileById";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

const MotionBox: React.FC<MotionBoxProps> = motion(Box);

type DraggablePageProps = {
  dragConstraints: React.RefObject<Element>;
} & PageProps;

const DraggablePage: React.FC<DraggablePageProps> = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const { dragConstraints, ...pageProps } = props;
  const [renderSize, setRenderSize] = useState({ width: 0, height: 0 });
  return (
    <MotionBox
      height={renderSize.height}
      width={renderSize.width}
      style={{ position: "relative", zIndex: isHovering ? 1 : "auto" }}
      drag
      dragConstraints={dragConstraints}
      dragMomentum={false}
      whileDrag={{ scale: 0.9 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {isHovering && (
        <Text
          width="full"
          background="blue.700"
          color="white"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          zIndex="modal"
          textAlign="center"
        >
          Drag me
        </Text>
      )}
      <Page
        {...pageProps}
        onLoadSuccess={(info) => {
          setRenderSize({ width: info.width, height: info.height });
        }}
      />
    </MotionBox>
  );
};

export const PdfDocument: React.FC<{ pdfId: string }> = (props) => {
  const constantsRef = useRef(null);

  const pdfFile = usePdfFileById(props.pdfId, []);

  const [numPages, setNumPages] = useState(0);
  return (
    <>
      {pdfFile && (
        <Document
          options={{
            cMapUrl: "cmaps/",
            cMapPacked: true,
          }}
          file={pdfFile}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
          }}
        >
          <Flex justifyContent="center" marginBottom="1rem">
            <Heading as="h3" size="lg">
              {pdfFile.filename}
            </Heading>
          </Flex>
          <SimpleGrid columns={5} spacingY={8} ref={constantsRef}>
            {Array.from(new Array(numPages), (_, index) => (
              <DraggablePage
                width={200}
                key={index}
                dragConstraints={constantsRef}
                pageNumber={index + 1}
              />
            ))}
          </SimpleGrid>
        </Document>
      )}
    </>
  );
};
