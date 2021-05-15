import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

const FeatureHeading: React.FC = (props) => {
  return (
    <Heading textAlign="center" size="md" marginBottom="4px" colorScheme="gray">
      {props.children}
    </Heading>
  );
};

const FeatureContent: React.FC<{
  features: { name: string; link: string }[];
}> = (props) => {
  const history = useHistory();
  return (
    <Flex flexDirection="column">
      {props.features.map((i) => (
        <Button
          key={i.name}
          isFullWidth
          variant="ghost"
          size="sm"
          onClick={() => history.push(i.link)}
        >
          {i.name}
        </Button>
      ))}
    </Flex>
  );
};

const FeatureColumn: React.FC = (props) => {
  return <Flex flexDirection="column">{props.children}</Flex>;
};

export const ToolMenuDrawer: React.FC<ToolMenuDrawerProps> = (props) => {
  const MenuBgColor = useColorModeValue(
    "linear(to-r, blue.50, pink.50)",
    "linear(to-r, blue.900, pink.900)"
  );
  return (
    <Drawer placement="top" {...props}>
      <DrawerOverlay>
        <DrawerContent bgGradient={MenuBgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">ALL TOOLS</DrawerHeader>
          <DrawerBody>
            <Container maxWidth="container.xl">
              <SimpleGrid columns={[2, 3, 5]}>
                <FeatureColumn>
                  <FeatureHeading>Merge & Split</FeatureHeading>
                  <FeatureContent
                    features={[
                      { name: "Merge PDF", link: "/merge" },
                      { name: "Split PDF", link: "/Split" },
                    ]}
                  />
                </FeatureColumn>
              </SimpleGrid>
            </Container>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export type ToolMenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};
