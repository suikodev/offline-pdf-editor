import {
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  TextProps,
  Text,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";
import React from "react";

type Merge<P, T> = Omit<P, keyof T> & T;
export type MotionTextProps = Merge<TextProps, MotionProps> & {
  ref?: React.Ref<SVGElement | HTMLElement>;
};

export const MotionText: React.FC<MotionTextProps> = motion(Text);

export const MotionHeading =
  motion<Omit<HeadingProps, keyof MotionProps>>(Heading);

export const MotionFlex = motion<Omit<FlexProps, keyof MotionProps>>(Flex);
