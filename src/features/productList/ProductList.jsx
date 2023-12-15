import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import Skeleton from "../../Components/Skeleton";
import Rating from "../Rating";
import {
  selectProduct,
  getProduct,
  searchProduct,
  sortingProduct,
  filterProduct,
  getBuyProduct,
} from "./productListSlice";
import { useToast } from "@chakra-ui/react";
import NotFoundImage from "../../assets/notFoundImage.svg";
import { IoIosSearch, IoIosEye, IoIosHeart } from "react-icons/io";
import { getDetail } from "./detailProductSlice";
import { motion } from "framer-motion";
const ProductList = ({ handleOpenModalDetail, handleOpenModalBuyProduct }) => {
  const products = useSelector(selectProduct);
  const [category, setCategory] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [likeProduct, setLikeProduct] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(getProduct(data));
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchProduct();
  }, [dispatch]);

  const handleDetail = (product) => {
    const getProduct = products.find((item) => item.id === product.id);
    dispatch(getDetail(getProduct));
    handleOpenModalDetail();
  };
  const handleAddItemToCart = (item) => {
    toast({
      title: "Successfully added item to cart",
      position: "top-right",
      status: "success",
      isClosable: true,
      duration: 3000,
    });
    dispatch(addItemToCart(item));
    // handleOpenModalCart();
  };

  const handleBuyProduct = (item) => {
    dispatch(getBuyProduct(item.id));
    handleOpenModalBuyProduct();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("search") || formData.get("search").trim() === "") return;
    dispatch(searchProduct(formData.get("search").toLocaleLowerCase()));
  };
  return (
    <>
      <div className="w-full sticky top-0">
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex lg:items-center items-start gap-8 flex-col lg:flex-row">
            <div className="lg:w-1/3 w-full grid gap-2">
              <label
                htmlFor="category"
                className="font-bold text-lg text-black"
              >
                Category Product
              </label>
              <select
                name=""
                id="category"
                className="p-3 w-full rounded-lg cursor-pointer"
                onChange={(e) => dispatch(filterProduct(e.target.value.toLocaleLowerCase()))}
              >
                <option value="Select Categories" hidden>
                  Select Categories
                </option>
                <option className="capitalize" value="All Categories">
                  All Categories
                </option>
                {category?.map((item, i) => {
                  return (
                    <option className="capitalize" value={item} key={i}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="lg:w-1/3 w-full grid gap-2">
              <label htmlFor="sorting" className="font-bold text-lg text-black">
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
              <label htmlFor="search" className="font-bold text-lg text-black">
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
              <button
                className="text-3xl absolute top-11 right-2"
                type="submit"
              >
                <IoIosSearch aria-label="search" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-full lg:grid-cols-3 place-items-cente lg:place-items-center md:grid-cols-2 grid gap-3 py-4">
        {isLoading ? (
          [...Array(20).keys()].map((_, i) => <Skeleton key={i} />)
        ) : products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product.id}
              className="rounded-xl border shadow-xl p-4 w-full h-full group relative"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-full flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDetail(product)}
                  className="bg-slate-600 w-10 h-10 rounded-full text-white text-xl flex justify-center items-center hover:scale-110 transition-transform duration-150 ease-in-out"
                >
                  <IoIosEye aria-label="see" />
                </button>
                {/* <button
                  type="button"
                  onClick={() => setLikeProduct(prev => !prev)}
                  className={`bg-slate-600 w-10 h-10 rounded-full text-xl ${likeProduct ? "text-red-600": "text-white"} transition-colors duration-300 ease-in-out flex justify-center items-center`}
                >
                  <IoIosHeart aria-label="like" />
                </button> */}
              </div>
              <div className="relative w-[80%] h-[250px] mx-auto overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-scale duration-300 ease-in-out"
                />
              </div>
              <div className="flex items-center w-full justify-between mt-8">
                <Rating rating={product.rating.rate} />
                <span className="text-lg">{product.rating.count} Reviews</span>
              </div>
              <div className=" flex flex-col gap-6 mt-5">
                <h1 className="h-[80px] font-bold text-lg">{product.title}</h1>
                <div className="grid gap-2 w-40 mt-3">
                  <h1>Category</h1>
                  <hr className="bg-black h-[2px]" />
                  <p className="capitalize  ">{product.category}</p>
                </div>
                <p className="text-2xl text-black">
                  {" "}
                  ${" "}
                  {product.price.toLocaleString("en-US", {
                    styles: "currency",
                    currency: "USD",
                  })}
                </p>
                <div className="flex items-center justify-between flex-wrap">
                  <button
                    type="button"
                    className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
                    onClick={() => handleBuyProduct(product)}
                  >
                    BUY NOW
                  </button>
                  <button
                    type="button"
                    className="bg-slate-700 text-white hover:bg-slate-800 rounded-lg text-sm py-3 px-8"
                    onClick={() => handleAddItemToCart(product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="grid place-items-center lg:mt-5 items-center gap-4 p-4 col-span-3">
            <img src={NotFoundImage} alt="not found" />
            <h1 className="font-bold text-3xl">Products Not Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
