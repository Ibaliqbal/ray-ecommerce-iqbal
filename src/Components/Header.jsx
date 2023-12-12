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
          d="M0,64L14.1,101.3C28.2,139,56,213,85,250.7C112.9,288,141,288,169,266.7C197.6,245,226,203,254,202.7C282.4,203,311,245,339,256C367.1,267,395,245,424,245.3C451.8,245,480,267,508,272C536.5,277,565,267,593,261.3C621.2,256,649,256,678,218.7C705.9,181,734,107,762,69.3C790.6,32,819,32,847,69.3C875.3,107,904,181,932,197.3C960,213,988,171,1016,144C1044.7,117,1073,107,1101,117.3C1129.4,128,1158,160,1186,154.7C1214.1,149,1242,107,1271,106.7C1298.8,107,1327,149,1355,170.7C1383.5,192,1412,192,1426,192L1440,192L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"
        ></path>
      </svg>
    </header>
  );
};

export default Header;
