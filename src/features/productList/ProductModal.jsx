import React from "react";
import Modal from "../../Components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { selectDetail } from "./detailProductSlice";
import { addItemToCart } from "../cart/cartSlice";
import { useToast } from "@chakra-ui/react";
import Rating from "../Rating";
import { getBuyProduct } from "./productListSlice";

const ProductModal = ({
  handleHideModalDetail,
  handleOpenModalCart,
  isOpenDetail,
  handleOpenModalBuyProduct,
}) => {
  const detailProduct = useSelector(selectDetail);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleAddItemToCart = (item) => {
    toast({
      title: "Successfully added item to cart",
      position: "top-right",
      status: "success",
      isClosable: true,
      duration: 3000,
    });
    dispatch(addItemToCart(item));
    handleOpenModalCart();
    handleHideModalDetail();
  };
  return (
    <Modal isOpen={isOpenDetail}>
      <section className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex justify-between items-center h-10">
          <h1 className="text-xl lg:text-4xl font-bold ">Detail Product</h1>
          <button
            className="w-12 h-12 bg-red-600 rounded-full text-xl font-bold text-white"
            onClick={handleHideModalDetail}
          >
            X
          </button>
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-[150px] h-auto overflow-hidden">
            <img
              src={detailProduct.image}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold">{detailProduct.title}</h1>
          <p className="max-h-[100px] overflow-auto text-lg">
            {detailProduct.description}
          </p>
          <div className="self-start flex flex-col">
            <h3>Ratings</h3>
            <div className="mt-2">
              <Rating rating={detailProduct.rating.rate} /> |{" "}
              <span className="text-sm">
                {detailProduct.rating.count} Reviews
              </span>
            </div>
          </div>
          <div className="self-start">
            <h3>Category</h3>
            <hr className="bg-black h-[2px]" />
            <p className="bg-slate-300 p-2 rounded-full mt-2 capitalize">
              {detailProduct.category}
            </p>
          </div>
          <div className="self-start">
            <h3 className="text-sm font-bold text-black">
              Price: ${" "}
              {detailProduct.price.toLocaleString("en-US", {
                styles: "currency",
                currency: "USD",
              })}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            className="bg-blue-700 text-white hover:bg-blue-800 rounded-lg text-sm py-3 px-8"
            onClick={() => {
              dispatch(getBuyProduct(detailProduct.id));
              handleOpenModalBuyProduct()
              handleHideModalDetail()
            }}
          >
            BUY NOW
          </button>
          <button
            type="button"
            className="bg-slate-700 text-white hover:bg-slate-800 rounded-lg text-sm py-3 px-8"
            onClick={() => handleAddItemToCart(detailProduct)}
          >
            ADD TO CART
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default ProductModal;
