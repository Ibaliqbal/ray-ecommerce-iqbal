import React, { useState, useEffect } from "react";
import Cart from "../assets/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";
import {
  filterProduct,
  sortingProduct,
  searchProduct,
} from "../features/productList/productListSlice";
import { IoIosSearch } from "react-icons/io";

const Header = ({ handleOpenModalCart }) => {
  const [category, setCategory] = useState([]);
  const totalCartItem = useSelector(selectCartTotalItems);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const categories = data.reduce((acc, curr) => {
          if (!acc.includes(curr.category)) {
            acc.push(curr.category);
          }
          return acc;
        }, []);
        setCategory(categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("search") || formData.get("search").trim() === "") return;
    dispatch(searchProduct(formData.get("search").toLocaleLowerCase()));
  };
  return (
    <header className="bg-blue-700 pb-8 pt-6 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-auto">
          <h1 className="text-3xl font-bold text-gray-100 title-header">
            Ray E-Commerce
          </h1>
          <button
            type="button"
            className="relative rounded-full bg-blue-800 p-2 text-gray-100"
            onClick={handleOpenModalCart}
          >
            <img src={Cart} alt="Cart" className="w-6 h-6" />
            {totalCartItem > 0 ? (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                {totalCartItem}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex lg:items-center items-start gap-8 flex-col lg:flex-row">
          <div className="lg:w-1/3 w-full grid gap-2">
            <label htmlFor="category" className="font-bold text-lg text-white">
              Category Product
            </label>
            <select
              name=""
              id="category"
              className="p-3 w-full rounded-lg cursor-pointer"
              onChange={(e) => dispatch(filterProduct(e.target.value))}
            >
              <option value="Select Categories" hidden>
                Select Categories
              </option>
              <option value="Semua">Semua</option>
              {category?.map((item, i) => {
                return (
                  <option value={item} key={i}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="lg:w-1/3 w-full grid gap-2">
            <label htmlFor="sorting" className="font-bold text-lg text-white">
              Sorting Product
            </label>
            <select
              name=""
              id="sorting"
              className="w-full p-3 rounded-lg cursor-pointer"
              onChange={(e) => dispatch(sortingProduct(e.target.value))}
            >
              <option value="Choose your sort method" hidden>
                Sort By
              </option>
              <option value="Sorting ascending">Sorting [A-Z]</option>
              <option value="Sorting descending">Sorting [Z-A]</option>
              <option value="Cheap Price">Cheap Price</option>
              <option value="Expensive Price">Expensive price</option>
            </select>
          </div>
          <form
            className="relative w-full lg:w-1/3 grid gap-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="search" className="font-bold text-lg text-white">
              Search
            </label>
            <input
              name="search"
              type="text"
              className="p-3 rounded-md"
              placeholder="Some product..."
              id="search"
              onChange={(e) =>
                dispatch(searchProduct(e.target.value.toLocaleLowerCase()))
              }
            />
            <button className="text-3xl absolute top-11 right-2" type="submit">
              <IoIosSearch aria-label="search" />
            </button>
          </form>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute">
        <path
          fill="#1d4ed8"
          fill-opacity="1"
          d="M0,160L34.3,154.7C68.6,149,137,139,206,149.3C274.3,160,343,192,411,181.3C480,171,549,117,617,106.7C685.7,96,754,128,823,128C891.4,128,960,96,1029,80C1097.1,64,1166,64,1234,85.3C1302.9,107,1371,149,1406,170.7L1440,192L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
    </header>
  );
};

export default Header;
