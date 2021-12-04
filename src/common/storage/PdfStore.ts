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

export const PdfStore: {
  iterate: (
    iteratee: (value: Pdf, pdfId: string, iterationNumber: number) => void
  ) => Promise<void>;
  setItem: (pdfId: string, value: Pdf) => Promise<Pdf>;
  getItem: (pdfId: string) => Promise<Pdf | null>;
  removeItem: (pdfId: string) => Promise<void>;
} = {
  iterate: PdfStorage.iterate,
  getItem: PdfStorage.getItem,
  setItem: PdfStorage.setItem,
  removeItem: PdfStorage.removeItem,
};
