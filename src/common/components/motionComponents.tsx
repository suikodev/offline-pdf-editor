import { HTMLChakraProps, Text } from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionTextProps = Merge<HTMLChakraProps<"p">, HTMLMotionProps<"p">>;

export const MotionText: React.FC<MotionTextProps> = motion(Text);
