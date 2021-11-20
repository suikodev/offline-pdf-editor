import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: "#e9e6ff",
    100: "#beb7fe",
    200: "#8f88f7",
    300: "#5e59f2",
    400: "#2b2bed",
    500: "#1f12d4",
    600: "#1e0ba6",
    700: "#1a0678",
    800: "#12024a",
    900: "#0a001f",
  },
  secondary: {
    50: "#ffe2fa",
    100: "#ffb1ff",
    200: "#f87fff",
    300: "#ed4cff",
    400: "#e11aff",
    500: "#bf00e6",
    600: "#a100b4",
    700: "#7c0081",
    800: "#50004e",
    900: "#1f001d",
  },
};

export const theme = extendTheme({
  colors,
  config,
});
