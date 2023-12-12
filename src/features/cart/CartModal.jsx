/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import {
  selectCartItem,
  selectCartTotalItems,
  selectCartTotalPrices,
  tambahQuantity,
  kurangQuantity,
  deleteItem,
} from "./cartSlice";
import Swal from "sweetalert2";
import CartImage from "../../assets/cartImage.svg";
import { useDispatch } from "react-redux";
import Modal from "../../Components/Modal";

const CartModal = ({ handleHideModalCart }) => {
  const cartItems = useSelector(selectCartItem);
  const totalItems = useSelector(selectCartTotalItems);
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectCartTotalPrices);
  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6281285241889";
    const message = encodeURIComponent(
      `Halo, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrice}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to remove this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Removed!",
          text: "Your product has been removed.",
          icon: "success",
        });
        dispatch(deleteItem(id));
      }
    });
  };

  return (
    <Modal>
      <div className="flex flex-col gap-6 p-1: sm:p-2 w-full lg:w-[900px]">
        <div className="flex justify-between items-center h-10">
          <h1 className="text-xl lg:text-4xl font-bold ">Cart Product</h1>
          <button
            className="w-6 h-6 bg-red-600 rounded-full text-white"
            onClick={handleHideModalCart}
          >
            X
          </button>
        </div>
        {cartItems?.length > 0 ? (
          <>
            <div className="flex flex-col gap-6 max-h-[500px] overflow-auto">
              {cartItems.map((product) => {
                return (
                  <div
                    className="w-full border-b-4 border-blue-200 pb-4"
                    key={product.id}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-[120px] h-auto overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-10 w-[75%]">
                        <h3 className="capitalize mt-3 text-lg">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm">{product.price}</h4>
                          <h3 className="text-lg font-bold">
                            ${" "}
                            {product.totalPrice.toLocaleString("en-US", {
                              styles: "currency",
                              currency: "USD",
                            })}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 mt-4 ml-auto">
                          <button
                            type="button"
                            className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                            onClick={() => dispatch(kurangQuantity(product))}
                          >
                            -
                          </button>
                          <h3>{product.quantity}</h3>
                          <button
                            type="button"
                            className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                            onClick={() => dispatch(tambahQuantity(product))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[50px] h-auto">
                        <button
                          type="button"
                          className="font-bold bg-red-600 w-6 h-6 rounded-full flex items-center justify-center text-white"
                          onClick={() => handleDelete(product.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h3 className="text-md font-bold">Total Item: {totalItems}</h3>
              <h3 className="text-md font-bold">
                Total Price: ${" "}
                {totalPrice.toLocaleString("en-US", {
                  styles: "currency",
                  currency: "USD",
                })}
              </h3>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <img
              src={CartImage}
              alt="CartImage"
              width={"150px"}
              height={"150px"}
            />
            <h1 className="text-lg font-bold text-slate-600 lg:text-2xl">
              No product in your cart
            </h1>
          </div>
        )}
        <div className="flex items-center gap-6 justify-end">
          <button
            type="button"
            className={`bg-green-600 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl text-sm ${
              cartItems?.length > 0
                ? "cursor-pointer bg-opacity-100"
                : "bg-opacity-50 cursor-not-allowed"
            }`}
            disabled={cartItems.length > 0 ? false : true}
            onClick={handleCheckoutToWhatsapp}
          >
            Checkout (Whatsapp)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
