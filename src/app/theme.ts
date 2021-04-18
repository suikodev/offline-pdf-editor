import { ColorMode, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light" as ColorMode,
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: "#ede7ff",
    100: "#c5b9fc",
    200: "#9e8cf4",
    300: "#775fee",
    400: "#5031e8",
    500: "#3717ce",
    600: "#2911a1",
    700: "#1d0c75",
    800: "#100748",
    900: "#06021e",
  },
};

export const theme = extendTheme({ colors, config });
