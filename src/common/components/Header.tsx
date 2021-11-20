import { Box, Flex, Heading, HStack } from "@chakra-ui/layout";
import {
  ButtonProps,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  TooltipProps,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { CgMenuMotion } from "react-icons/cg";
import { FaFileUpload } from "react-icons/fa";
import { IoLanguage, IoLogoGithub, IoMoon, IoSunny } from "react-icons/io5";
import { useAppSelector } from "../hooks";
import { usePdfPicker } from "../hooks/usePdfPicker";
import { PdfManageDrawer } from "./PdfManageDrawer";
import { lngs } from "../../i18n";
import { useTranslation } from "react-i18next";
import { repository } from "../../../package.json";

const headerButtonStyle: Partial<ButtonProps> = {
  fontSize: "2xl",
  colorScheme: "brand",
};

const tooltipStyle: Partial<TooltipProps> = {
  hasArrow: true,
  fontSize: "md",
  placement: "auto",
};

const LanguageButton: React.FC = () => {
  const { i18n, t } = useTranslation();
  return (
    <Menu>
      <Tooltip label={t("header.changeLanguage")} {...tooltipStyle}>
        <MenuButton
          as={IconButton}
          icon={<IoLanguage />}
          aria-label={t("header.changeLanguage")}
          {...headerButtonStyle}
        />
      </Tooltip>
      <MenuList>
        {lngs.map((lng) => (
          <MenuItem
            key={lng.code}
            onClick={() => i18n.changeLanguage(lng.code)}
          >
            {lng.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const GithubButton: React.FC<{ href: string }> = ({ href }) => {
  const { t } = useTranslation();
  return (
    <Tooltip label={t("header.goToGithubRepo")} {...tooltipStyle}>
      <IconButton
        onClick={() => {
          window.location.href = href;
        }}
        icon={<IoLogoGithub />}
        aria-label={t("header.goToGithubRepo")}
        {...headerButtonStyle}
      />
    </Tooltip>
  );
};

const ThemeToggleButton: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const SwitchIcon = useColorModeValue(IoMoon, IoSunny);
  return (
    <Tooltip label={t("header.toggleTheme")} {...tooltipStyle}>
      <IconButton
        onClick={toggleColorMode}
        icon={<Icon as={SwitchIcon} />}
        aria-label={t("header.toggleTheme")}
        {...headerButtonStyle}
      />
    </Tooltip>
  );
};

const ChoosePdfIconButton: React.FC = () => {
  const { openPdfPicker } = usePdfPicker();
  const { t } = useTranslation();
  return (
    <Tooltip label={t("header.choosePDF")} {...tooltipStyle}>
      <IconButton
        onClick={openPdfPicker}
        icon={<FaFileUpload />}
        aria-label={t("header.choosePDF")}
        {...headerButtonStyle}
      />
    </Tooltip>
  );
};

const OpenPdfManageDrawerButton: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { t } = useTranslation();
  return (
    <>
      <Tooltip
        label={t("header.openPDFmanegeMenu")}
        hasArrow
        fontSize="md"
        placement="auto"
      >
        <IconButton
          aria-label={t("header.openPDFmanegeMenu")}
          onClick={onToggle}
          icon={<CgMenuMotion />}
          {...headerButtonStyle}
        />
      </Tooltip>
      <PdfManageDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export const Header: React.FC = () => {
  const bgGradient = useColorModeValue(
    "linear(to-l, brand.500, secondary.500)",
    "linear(to-l, brand.200, secondary.200)"
  );
  const isPdfExist = useAppSelector(
    (state) => (state.pdfInfo.pdfInfoList?.length || 0) > 0
  );
  return (
    <Box as="header" paddingY="16px" paddingX="32px">
      <Flex justify="start" align="center">
        <Heading size="lg" bgGradient={bgGradient} bgClip="text">
          Offline PDF Editor
        </Heading>
        <Flex justify="flex-end" flex="1">
          <HStack spacing={2} justify="center">
            <LanguageButton />
            <GithubButton href={repository.url} />
            <ThemeToggleButton />
            {isPdfExist && <OpenPdfManageDrawerButton />}
            {!isPdfExist && <ChoosePdfIconButton />}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};
