import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultItems: [],
  item: [],
  searchingItems: [],
  filterItem: [],
  afterSearching: false,
  afterSorting: false,
  sortingItems: [],
};

export const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      const newProduct = action.payload;
      state.defaultItems = newProduct;
      state.item = newProduct;
    },
    filterProduct: (state, action) => {
      const filter = action.payload;
      console.log(filter);
      if (filter === "Semua") {
        state.item = state.defaultItems;
        state.filterItem = state.item;
        console.log(state.filterItem);
        if (state.searchingItems.length > 0) {
        }
      } else {
        if (!state.afterSorting) {
          const filteCategoryProduct = state.defaultItems.filter(
            (item) => item.category === filter
          );
          state.filterItem = filteCategoryProduct;
          state.item = filteCategoryProduct;
          console.log(state.filterItem);
        } else {
          const filteCategoryProduct = state.sortingItems.filter(
            (item) => item.category === filter
          );
          state.filterItem = filteCategoryProduct;
          state.item = filteCategoryProduct;
          console.log(state.filterItem);
        }
      }
    },
    sortingProduct: (state, action) => {
      const sorting = action.payload;
      state.afterSorting = true;
      if (sorting === "Sorting ascending") {
        const sortAs = state.item.sort((a, b) =>
          a.title > b.title ? 1 : a.title < b.title ? -1 : 0
        );
        const sortAsItems = state.defaultItems.sort((a, b) =>
          a.title > b.title ? 1 : a.title < b.title ? -1 : 0
        );
        state.sortingItems = sortAsItems;
        state.item = sortAs;
      } else if (sorting === "Sorting descending") {
        const sortDes = state.item.sort((a, b) =>
          a.title < b.title ? 1 : a.title > b.title ? -1 : 0
        );
        const sortDesItems = state.defaultItems.sort((a, b) =>
          a.title < b.title ? 1 : a.title > b.title ? -1 : 0
        );
        state.sortingItems = sortDesItems;
        state.item = sortDes;
      } else if (sorting === "Cheap Price") {
        const sortCheap = state.item.sort((a, b) => a.price - b.price);
        const sortCheapItems = state.defaultItems.sort(
          (a, b) => a.price - b.price
        );
        state.sortingItems = sortCheapItems;
        state.item = sortCheap;
      } else {
        const sortEx = state.item.sort((a, b) => b.price - a.price);
        const sortExItems = state.defaultItems.sort(
          (a, b) => b.price - a.price
        );
        state.sortingItems = sortExItems;
        state.item = sortEx;
      }
    },
    searchProduct: (state, action) => {
      state.afterSearching = true;
      const search = action.payload;
      if (search === " ") {
        state.item = state.defaultItems;
        state.searchingItems = state.item;
      } else {
        if (state.filterItem?.length > 0) {
          const seacrhItem = state.item.filter((item) =>
            item.title.toLowerCase().includes(search)
          );
          const seacrhItems = state.defaultItems.filter((item) =>
            item.title.toLowerCase().includes(search)
          );
          state.item = seacrhItem;
          state.sortingItems = seacrhItems;
        } else {
          const seacrhItem = state.defaultItems.filter((item) =>
            item.title.toLowerCase().includes(search)
          );
          const seacrhItems = state.defaultItems.filter((item) =>
            item.title.toLowerCase().includes(search)
          );
          state.item = seacrhItem;
          state.sortingItems = seacrhItems;
        }
      }
    },
  },
});

export const { getProduct, filterProduct, sortingProduct, searchProduct } =
  productListSlice.actions;
export default productListSlice;
export const selectProduct = (state) => state.product.item;
