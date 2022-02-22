import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useAppSelector } from "../hooks";

const ServiceWorkerUpdateDialog: React.FC = () => {
  const isUpdateAvailable = useAppSelector(
    (state) => state.serviceWorker.isUpdateAvailable
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (isUpdateAvailable) {
      setIsOpen(true);
    }
  }, [isUpdateAvailable]);

  const handleUpdate = () => {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        registration.waiting?.postMessage({ type: "SKIP_WAITING" });
        handleClose();
      }
    });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={handleClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>网站更新</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          网站有更新内容, 是否立即更新? (选择稍后会在网站关闭后将自动更新)
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={handleClose}>
            稍后
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleUpdate}>
            立即更新
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ServiceWorkerUpdateDialog;
