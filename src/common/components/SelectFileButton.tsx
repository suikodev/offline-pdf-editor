import { Button, ButtonProps } from "@chakra-ui/button";
import React, { FormEvent, useRef } from "react";

export const SelectFileButton: React.FC<SelectFileButtonProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onFilesSelected, accept, multiple, ...buttonProps } = props;

  const handleFilesSelected = (e: FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;
    onFilesSelected(files);
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        onChange={handleFilesSelected}
        multiple={multiple}
        hidden
      />
      <Button
        onClick={() => inputRef.current?.click()}
        {...buttonProps}
      ></Button>
    </>
  );
};

export type SelectFileButtonProps = {
  /**
   * callback invoked when user have selected file.
   */
  onFilesSelected: (files: FileList) => void;
  /**
   * accept a string to limit file type for selecting, see details:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefaccept
   */
  accept?: string;
  /**
   * if true, user can choose more than one file
   */
  multiple?: boolean;
} & Omit<ButtonProps, "onClick">;
