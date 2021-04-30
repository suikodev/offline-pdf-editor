import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { Pdf, PdfStore } from "../../common/storage/PdfStore";

// omit pdf content to avoid putting non-serializable data in state
type PdfPropertiesInState = Omit<Pdf, "content">;

type PdfState = {
  pdfList: PdfPropertiesInState[];
};

const initialState: PdfState = {
  pdfList: [],
};

export const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(concat.fulfilled, (state, action) => {
      state.pdfList = [...state.pdfList, ...action.payload];
    });
  },
});

const concat = createAsyncThunk(
  "pdf/concat",
  async (pdfList: Omit<Pdf, "id">[]) => {
    const result: PdfPropertiesInState[] = [];
    for (const pdf of pdfList) {
      const id = nanoid();
      const item = await PdfStore.setItem(id, { ...pdf, id });
      result.push({ id: item.id, filename: item.filename });
    }
    return result;
  }
);
