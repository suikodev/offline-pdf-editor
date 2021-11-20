import { ColorHues, useTheme } from "@chakra-ui/react";

export const useColor = (): Record<"brand" | "secondary" | "grey", ColorHues> &
  Record<"black" | "white", string> => {
  const { colors } = useTheme();
  return colors;
};
