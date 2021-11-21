import {
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionText = motion<TextProps>(Text);

export const MotionHeading = motion<HeadingProps>(Heading);

export const MotionFlex = motion<FlexProps>(Flex);
