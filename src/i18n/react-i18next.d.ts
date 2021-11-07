import { resources } from ".";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"];
  }
}
