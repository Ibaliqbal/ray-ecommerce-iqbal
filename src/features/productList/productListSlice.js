import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultItems: [],
  item: [],
  searchingItems: [],
  searchPayload: "",
  filterItem: [],
  afterSearching: false,
  afterFilter: false,
  afterSorting: false,
  sortingItems: [],
  buyProduct: [],
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
      state.afterFilter = true;
      if (filter === "all categories") {
        state.item = state.defaultItems;
        state.filterItem = state.item;
        if (!state.afterSearching) {
          state.item = state.defaultItems;
          state.filterItem = state.item;
        } else {
          const productFilter = state.defaultItems.filter((item) =>
            item.title.toLowerCase().includes(state.searchPayload)
          );
          state.item = productFilter;
          state.filterItem = state.defaultItems;
        }
      } else {
        if (!state.afterSorting) {
          const filteCategoryProduct = state.defaultItems.filter(
            (item) => item.category === filter
          );
          if (!state.afterSearching) {
            state.filterItem = filteCategoryProduct;
            state.item = filteCategoryProduct;
          } else {
            const productFilter = filteCategoryProduct.filter((item) =>
              item.title.toLowerCase().includes(state.searchPayload)
            );
            state.item = productFilter;
            state.filterItem = filteCategoryProduct;
          }
        } else {
          const filteCategoryProduct = state.sortingItems.filter(
            (item) => item.category === filter
          );
          if (!state.afterSearching) {
            state.filterItem = filteCategoryProduct;
            state.item = filteCategoryProduct;
          } else {
            const productFilter = filteCategoryProduct.filter((item) =>
              item.title.toLowerCase().includes(state.searchPayload)
            );
            state.item = productFilter;
            state.filterItem = filteCategoryProduct;
          }
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
      state.searchPayload = action.payload;
      if (state.filterItem.length > 0) {
        console.log("tombol filter sudah dipilih");
        if (search === " ") {
          state.item = state.filterItem;
          state.searchingItems = state.item;
        } else {
          const searchItems = state.filterItem.filter((item) =>
            item.title.toLowerCase().includes(search)
          );
          state.searchingItems = searchItems;
          state.item = searchItems;
        }
      } else {
        if (search === " ") {
          state.item = state.defaultItems;
          state.searchingItems = state.item;
        } else {
          const searchItems = state.defaultItems.filter((item) =>
            item.title.toLowerCase().includes(search)
          );
          state.searchingItems = searchItems;
          state.item = searchItems;
        }
      }
    },
    getBuyProduct: (state, action) => {
      const id = action.payload;
      const getProduct = state.item.find((item) => item.id === id);
      state.buyProduct = { ...getProduct, quantity: 1 };
    },
    updateQuantity: (state, action) => {
      if (action.payload === "increment") {
        state.buyProduct.quantity++;
      } else {
        if (state.buyProduct.quantity === 1) {
          state.buyProduct.quantity = 1;
        } else {
          state.buyProduct.quantity--;
        }
      }
    },
  },
});

export const {
  getProduct,
  filterProduct,
  sortingProduct,
  searchProduct,
  getBuyProduct,
  updateQuantity,
} = productListSlice.actions;
export default productListSlice;
export const selectProduct = (state) => state.product.item;
export const selectBuyProduct = (state) => state.product.buyProduct;
export const totalBuyItem = (state) => state.product.buyProduct.quantity;
export const totalPriceItem = (state) =>
  state.product.buyProduct.quantity * state.product.buyProduct.price;
