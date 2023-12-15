import React from "react";
import Modal from "../../Components/Modal";
import { useSelector, useDispatch } from "react-redux";
import Rating from "../Rating";
import {
  selectBuyProduct,
  totalBuyItem,
  totalPriceItem,
  updateQuantity,
} from "./productListSlice";

const BuyProductModal = ({ handleHideModalBuyProduct, isOpenBuy }) => {
  const buyProduct = useSelector(selectBuyProduct);
  const totalItems = useSelector(totalBuyItem);
  const totalPrice = useSelector(totalPriceItem);
  const dispatch = useDispatch();
  const handleCheckOut = () => {
    const phoneNumber = "6281285241889";
    const harga = Math.round(totalPrice * 15500);
    const message = encodeURIComponent(
      `Halo, saya ingin membeli 
      Nama barang : ${buyProduct.title} 
      Kode barang : ${buyProduct.id}
      Total barang : ${totalItems} 
      Harga barang : ${harga.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };
  return (
    <Modal isOpen={isOpenBuy}>
      <section className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex justify-between items-center h-10">
          <h1 className="text-xl lg:text-4xl font-bold ">Buy Product</h1>
          <button
            className="w-12 h-12 bg-red-600 rounded-full text-xl font-bold text-white"
            onClick={handleHideModalBuyProduct}
          >
            X
          </button>
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-[120px] h-[120px] overflow-hidden">
            <img
              src={buyProduct.image}
              alt="Product"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold">{buyProduct.title}</h1>
          <p className="max-h-[100px] overflow-auto text-lg">
            {buyProduct.description}
          </p>
          <div className="self-start flex flex-col">
            <h3>Ratings</h3>
            <div className="mt-2">
              <Rating rating={buyProduct.rating.rate} /> |{" "}
              <span className="text-sm">{buyProduct.rating.count} Reviews</span>
            </div>
          </div>
          <div className="self-start">
            <h3>Category</h3>
            <hr className="bg-black h-[2px]" />
            <p className="bg-slate-300 p-2 rounded-full mt-2 capitalize">
              {buyProduct.category}
            </p>
          </div>
          <div className="self-start">
            <h3 className="text-lg font-bold text-green-500">
              Price: ${" "}
              {buyProduct.price.toLocaleString("en-US", {
                styles: "currency",
                currency: "USD",
              })}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between w-full flex-col lg:flex-row gap-3">
          <div className="flex items-center justify-between gap-4 lg:w-1/2 px-8">
            <div className="flex gap-4 items-center justify-center py-3">
              <button
                type="button"
                className="rounded-full bg-red-600 w-7 h-7 text-3xl text-white flex items-center justify-center"
                onClick={() => dispatch(updateQuantity("decrement"))}
              >
                -
              </button>
              <h3 className="bg-white text-center w-20 rounded-md">
                {buyProduct.quantity}
              </h3>
              <button
                type="button"
                className="rounded-full bg-blue-600 w-7 h-7 text-white flex items-center justify-center"
                onClick={() => dispatch(updateQuantity("increment"))}
              >
                +
              </button>
            </div>
            <h5 className="text-lg">Total Price : $ {totalPrice}</h5>
          </div>
          <button
            type="button"
            className="bg-blue-700 text-white lg:w-1/2 w-full hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
            onClick={handleCheckOut}
          >
            BUY NOW
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default BuyProductModal;
