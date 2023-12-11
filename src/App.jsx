import { useState } from "react";
import "./App.css";
import ProductList from "./features/productList/ProductList";
import CartModal from "./features/cart/CartModal";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
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
      />
      <main className=" max-w-7xl mx-auto px-4 pb-10 pt-10">
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
