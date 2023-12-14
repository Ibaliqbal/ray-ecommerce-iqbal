import { useRef, useState } from "react";
import "./App.css";
import ProductList from "./features/productList/ProductList";
import CartModal from "./features/cart/CartModal";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import transition from "./features/transition";
import ProductModal from "./features/productList/ProductModal";
import BuyProductModal from "./features/productList/BuyProductModal";
import { IoIosArrowRoundUp } from "react-icons/io";
function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const headerRef = useRef(null);
  const [appearsBtn, setAppearsBtn] = useState(false);
  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };
  const handleOpenModalDetail = () => {
    setIsOpenDetail(true);
  };
  const handleOpenModalBuyProduct = () => {
    setIsOpenBuy(true);
  };

  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  };
  const handleHideModalDetail = () => {
    setIsOpenDetail(false);
  };
  const handleHideModalBuyProduct = () => {
    setIsOpenBuy(false);
  };

  window.onscroll = function() {
    const headerTop = headerRef.current.offsetTop;
    if (window.pageYOffset > headerTop) {
      setAppearsBtn(true);
    } else {
      setAppearsBtn(false);
    }
  }
  return (
    <>
      {isOpenModalCart ? (
        <CartModal
          handleHideModalCart={handleHideModalCart}
          isOpenModalCart={isOpenModalCart}
        />
      ) : null}
      {isOpenDetail ? (
        <ProductModal
          handleHideModalDetail={handleHideModalDetail}
          isOpenDetail={isOpenDetail}
          handleOpenModalCart={handleOpenModalCart}
          handleOpenModalBuyProduct={handleOpenModalBuyProduct}
        />
      ) : null}
      {isOpenBuy ? (
        <BuyProductModal
          handleHideModalBuyProduct={handleHideModalBuyProduct}
          isOpenBuy={isOpenBuy}
        />
      ) : null}
      <Header handleOpenModalCart={handleOpenModalCart} headerRef={headerRef} />
      <main className=" max-w-7xl mx-auto px-4 pb-10 pt-10 relative">
        <ProductList
          handleOpenModalDetail={handleOpenModalDetail}
          handleOpenModalCart={handleOpenModalCart}
          handleOpenModalBuyProduct={handleOpenModalBuyProduct}
        />
      </main>
      <Footer />
      {appearsBtn ? (
        <div className="bg-slate-600 text-white w-12 h-12 flex justify-center items-center text-3xl hover:animate-bounce fixed bottom-4 shadow-lg rounded-full right-4">
          <a href="#">
            <IoIosArrowRoundUp aria-label="to top" />
          </a>
        </div>
      ) : null}
    </>
  );
}

export default transition(App);
