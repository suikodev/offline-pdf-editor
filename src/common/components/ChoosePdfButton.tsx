import React from "react";
import { ButtonProps } from "@chakra-ui/button";
import { usePdfPicker } from "../hooks/usePdfPicker";
import { Button } from "@chakra-ui/react";

/**
 * click the button to choose pdf files, then files will store in browser
 */
export const ChoosePdfButton: React.FC<ChoosePdfButtonProps> = (props) => {
  const { onPdfStoreError, onPdfStoreSuccess, ...selectFileButtonProps } =
    props;
  const { openPdfPicker, isLoading } = usePdfPicker(() => {
    onPdfStoreSuccess?.();
  }, onPdfStoreError);
  return (
    <Button
      isLoading={isLoading}
      accept="application/pdf"
      multiple
      onClick={() => {
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
