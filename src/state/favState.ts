import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FavState = {
  id: null,
  style: null,
  format: null,
  color: null,
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setFav: (state, action: PayloadAction<Partial<FavState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFav } = favSlice.actions;
export default favSlice.reducer;