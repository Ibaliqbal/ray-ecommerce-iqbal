import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
};

export const detailProductSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    getDetail: (state, action) => {
      const detail = action.payload;
      state.item = detail
    },
  },
});

export const { getDetail } = detailProductSlice.actions;
export default detailProductSlice;
export const selectDetail = state => state.detail.item;
