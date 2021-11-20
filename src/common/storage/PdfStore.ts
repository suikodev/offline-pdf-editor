import localforage from "localforage";
import storage from "../../constants/storage.json";

export type Pdf = {
  id: string;
  filename: string;
  data: Uint8Array;
};

const PdfStorage = localforage.createInstance({
  name: process.env.REACT_APP_NAME,
  storeName: storage.PDFSTORE,
});

export class PdfStore {
  static iterate: (
    iteratee: (value: Pdf, pdfId: string, iterationNumber: number) => void
  ) => Promise<void> = PdfStorage.iterate;
  static setItem: (pdfId: string, value: Pdf) => Promise<Pdf> =
    PdfStorage.setItem;
  static getItem: (pdfId: string) => Promise<Pdf | null> = PdfStorage.getItem;
  static removeItem: (pdfId: string) => Promise<void> = PdfStorage.removeItem;
}
