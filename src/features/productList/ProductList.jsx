import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import Skeleton from "../../Components/Skeleton";
import Rating from "../Rating";
import { selectProduct, getProduct } from "./productListSlice";

const ProductList = () => {
  const products = useSelector(selectProduct);
  const [isLoading, setLoading] = useState(true);
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
    fetchProduct();
  }, [dispatch]);
  const handleAddItemToCart = (item) => {
    dispatch(addItemToCart(item));
  };
  return (
    <div className="w-full h-full lg:grid-cols-3 place-items-center md:grid-cols-2 grid gap-3 py-4">
      {isLoading ? (
        [...Array(10).keys()].map((_, i) => <Skeleton key={i} />)
      ) : products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl bg-slate-800 text-white border shadow p-4 w-full h-full group"
          >
            <div className="relative w-[80%] h-[250px] mx-auto overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-scale duration-300 ease-in-out"
              />
            </div>
            <div className=" flex flex-col gap-6 mt-8">
              <h3 className="h-12 font-bold">{product.title}</h3>
              <p className="h-[70px]">{product.description.slice(0, 150)}...</p>
              <p className="text-blue-500 mt-3">{product.price}</p>
              <div className="grid gap-2 w-28">
                <h3>Category</h3>
                <hr />
                <p>{product.category}</p>
              </div>
              <div className="grid gap-2 w-32">
                <h3>Ratings</h3>
                <hr />
                <div className="flex items-center gap-2">
                  <Rating rating={product.rating.rate} /> {"|"}
                  <span className="text-lg">{product.rating.count}</span>
                </div>
              </div>
              <button
                type="buttton"
                className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
                onClick={() => handleAddItemToCart(product)}
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="font-bold text-xl">Products Not Found</h1>
      )}
    </div>
  );
};

export default ProductList;
