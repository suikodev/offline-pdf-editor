import localforage from "localforage";
import storage from "../../constants/storage.json";

export const PDFStore = localforage.createInstance({
  name: process.env.REACT_APP_NAME,
  storeName: storage.PDFSTORE,
});
