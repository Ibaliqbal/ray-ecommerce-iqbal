/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import {
  selectCartItem,
  selectCartTotalItems,
  selectCartTotalPrices,
  tambahQuantity,
  kurangQuantity,
  deleteItem,
  checkedItem,
} from "./cartSlice";
import Swal from "sweetalert2";
import CartImage from "../../assets/cartImage.svg";
import { useDispatch } from "react-redux";
import Modal from "../../Components/Modal";

const CartModal = ({ handleHideModalCart, isOpenModalCart }) => {
  const cartItems = useSelector(selectCartItem);
  const totalItems = useSelector(selectCartTotalItems);
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectCartTotalPrices);
  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "6281285241889";
    const barang = cartItems.filter(item => item.checked === true)
    const harga = totalPrice * 15500;
    const message = encodeURIComponent(
      `Halo, saya ingin membeli 
      Nama barang : ${barang.map((item) => item.title).join(", ")},
      Kode barang : ${barang.map((item) => item.id).join(", ")},
      Total barang : ${totalItems},
      Harga Barang : ${harga.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })}`
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
      confirmButtonText: "Yes, remove it!",
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
    <Modal isOpen={isOpenModalCart}>
      <div className="flex flex-col gap-6 p-1 sm:p-2 w-full lg:w-[900px]">
        <div className="flex justify-between items-center h-10">
          <h1 className="text-xl lg:text-4xl font-bold ">Cart Product</h1>
          <button
            className="w-12 h-12 bg-red-600 rounded-full text-xl font-bold text-white"
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
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mr-5 w-7 h-7"
                        checked={product.checked}
                        onChange={() => dispatch(checkedItem(product.id))}
                      />
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
                            className="rounded-full bg-red-600 w-7 h-7 text-3xl text-white flex items-center justify-center"
                            onClick={() => dispatch(kurangQuantity(product))}
                          >
                            -
                          </button>
                          <h3>{product.quantity}</h3>
                          <button
                            type="button"
                            className="rounded-full bg-blue-600 w-7 h-7 text-white flex items-center justify-center"
                            onClick={() => dispatch(tambahQuantity(product))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-[50px] h-auto">
                        <button
                          type="button"
                          className="font-bold bg-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white"
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
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <img
              src={CartImage}
              alt="CartImage"
              width={"300px"}
              height={"300px"}
            />
            <h1 className="text-lg font-bold text-slate-600 lg:text-2xl">
              No product in your cart
            </h1>
          </div>
        )}
        <div className="flex items-center gap-6 w-full flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex items-center justify-between py-3 px-8">
            <h3 className="text-lg font-bold">Total Item: {totalItems}</h3>
            <h3 className="text-lg font-bold">
              Total Price: ${" "}
              {totalPrice.toLocaleString("en-US", {
                styles: "currency",
                currency: "USD",
              })}
            </h3>
          </div>
          <button
            type="button"
            className={`bg-green-600 w-full lg:w-1/2 text-white font-bold py-3 px-8 rounded-xl text-sm ${
              cartItems?.find((item) => item.checked === true)
                ? "cursor-pointer bg-opacity-100 hover:bg-green-700"
                : "bg-opacity-50 cursor-not-allowed hover:bg-slate-800"
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
