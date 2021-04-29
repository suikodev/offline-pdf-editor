import localforage from "localforage";
import storage from "../../constants/storage.json";

export type Pdf = {
  id: string;
  filename: string;
  content: Uint8Array;
};

const PdfStorage = localforage.createInstance({
  name: process.env.REACT_APP_NAME,
  storeName: storage.PDFSTORE,
});

export class PdfStore {
  static iterate: (
    iteratee: (value: Pdf, key: string, iterationNumber: number) => void
  ) => Promise<void> = PdfStorage.iterate;
  static setItem: (key: string, value: Pdf) => Promise<Pdf> =
    PdfStorage.setItem;
  static getITem: (key: string) => Promise<Pdf | null> = PdfStorage.getItem;
}
