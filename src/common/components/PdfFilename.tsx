import { Skeleton, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../hooks";
import { MotionText, MotionTextProps } from "./motionComponents";

const PdfFilename: React.FC<PdfFileNameProps> = (props) => {
  const { width, pdfId, ...textProps } = props;

  const filename = useAppSelector(
    (state) => state.pdfList.data?.find((p) => p.id === pdfId)?.filename
  );
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (filename) setIsLoaded(true);
  }, [filename]);

  const [isHoveringFilename, setIsHoveringFilename] = React.useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <Skeleton
      display="flex"
      isLoaded={isLoaded}
      marginTop="8px"
      overflow="hidden"
    >
      <Tooltip label={filename}>
        <MotionText
          ref={ref}
          animate={
            (ref.current?.clientWidth || 0) > width && !isHoveringFilename
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
          onHoverStart={() => setIsHoveringFilename(true)}
          onHoverEnd={() => setIsHoveringFilename(false)}
          whiteSpace="nowrap"
          {...textProps}
        >
          {filename}
        </MotionText>
      </Tooltip>
    </Skeleton>
  );
};

type PdfFileNameProps = { width: number; pdfId: string } & MotionTextProps;

export default React.memo(PdfFilename);
