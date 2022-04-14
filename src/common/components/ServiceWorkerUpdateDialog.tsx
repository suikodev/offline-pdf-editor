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
import { useTranslation } from "react-i18next";

const ServiceWorkerUpdateDialog: React.FC = () => {
  const isUpdateAvailable = useAppSelector(
    (state) => state.serviceWorker.isUpdateAvailable
  );

  const { t } = useTranslation();

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
        <AlertDialogHeader>
          {t("serviceWorkerUpdateDialog.updateAvailable")}
        </AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {t("serviceWorkerUpdateDialog.updateAvailableDescription")}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={handleClose}>
            {t("serviceWorkerUpdateDialog.updateLater")}
          </Button>
          <Button colorScheme="red" ml={3} onClick={handleUpdate}>
            {t("serviceWorkerUpdateDialog.updateNow")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ServiceWorkerUpdateDialog;
