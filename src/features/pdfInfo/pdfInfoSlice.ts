import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { Pdf, PdfStore } from "../../common/storage/PdfStore";

// omit pdf data to avoid putting non-serializable data in state
export type PdfInfo = Omit<Pdf, "data">;

type PdfListState = {
  data: PdfInfo[] | null;
};

const initialState: PdfListState = {
  data: null,
};

const concat = createAsyncThunk(
  "pdf/concat",
  async (pdfList: Omit<Pdf, "id">[]) => {
    const result: PdfInfo[] = [];
    for (const pdf of pdfList) {
      const id = nanoid();
      const item = await PdfStore.setItem(id, { ...pdf, id });
      result.push({ id: item.id, filename: item.filename });
    }
    return result;
  }
);

const remove = createAsyncThunk(
  "pdf/remove",
  async (pdfIdList: string[]): Promise<string[]> => {
    for (const id of pdfIdList) {
      await PdfStore.removeItem(id);
    }
    return pdfIdList;
  }
);

const init = createAsyncThunk("pdf/init", async () => {
  const result: PdfInfo[] = [];
  await PdfStore.iterate((pdf) => {
    result.push({ id: pdf.id, filename: pdf.filename });
  });
  return result;
});

const pdfInfoSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(concat.fulfilled, (state, action) => {
      if (!state.data) {
        state.data = [...action.payload];
      } else {
        state.data = [...state.data, ...action.payload];
      }
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.data =
        state.data?.filter((i) => !action.payload.includes(i.id)) || [];
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export { concat, remove, init };
export default pdfInfoSlice.reducer;
