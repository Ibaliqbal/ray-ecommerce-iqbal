import { useState } from "react";
import "./App.css";
import ProductList from "./features/productList/ProductList";
import CartModal from "./features/cart/CartModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [selectCategory, setSelectCategory] = useState("Semua");
  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };

  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  };

  return (
    <>
      {isOpenModalCart ? (
        <CartModal handleHideModalCart={handleHideModalCart} />
      ) : null}
      <Header
        handleOpenModalCart={handleOpenModalCart}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
      />
      <main className=" max-w-7xl mx-auto px-4 pb-10 pt-10">
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
