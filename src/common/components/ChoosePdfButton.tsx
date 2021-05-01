import React, { useState } from "react";
import { ButtonProps } from "@chakra-ui/button";
import { usePdfPicker } from "../hooks/usePdfPicker";
import { Button } from "@chakra-ui/react";

/**
 * click the button to choose pdf files, then files will store in browser
 */
export const ChoosePdfButton: React.FC<ChoosePdfButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    onPdfStoreError,
    onPdfStoreSuccess,
    ...selectFileButtonProps
  } = props;
  const openPdfPicker = usePdfPicker(() => {
    setIsLoading(false);
    onPdfStoreSuccess?.();
  }, onPdfStoreError);
  return (
    <Button
      isLoading={isLoading}
      accept="application/pdf"
      multiple
      onClick={() => {
        setIsLoading(true);
        openPdfPicker?.();
      }}
      {...selectFileButtonProps}
    ></Button>
  );
};

type ChoosePdfButtonProps = {
  /**
   * callback when PDF is stored on browser successfully.
   */
  onPdfStoreSuccess?: () => void;
  /**
   * callback when PDF fail to be store on browser.
   */
  onPdfStoreError?: (error: Error) => void;
} & ButtonProps;
