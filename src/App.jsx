import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import ProductList from "./features/productList/ProductList";
import CartModal from "./features/cart/CartModal";
import Footer from "./Components/Footer";

function App() {
  const [isOPneModalCart, setIsOpenModalCart] = useState(false);
  const [selectCategory, setSelectCategory] = useState("Semua");
  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
  };

  const handleHideModalCart = () => {
    setIsOpenModalCart(false);
  };

  return (
    <>
      {isOPneModalCart ? (
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
