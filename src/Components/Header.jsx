import Cart from "../assets/cart.svg";
import { useSelector } from "react-redux";
import { selectCartItem } from "../features/cart/cartSlice";

const Header = ({ handleOpenModalCart, headerRef }) => {
  const totalCartItem = useSelector(selectCartItem);
  return (
    <header className="bg-blue-700 pb-8 pt-6 relative top-0 left-0" ref={headerRef}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-auto">
          <h1 className="text-3xl font-bold text-gray-100 title-header">
            Ray E-Commerce
          </h1>
          <button
            type="button"
            className="relative rounded-full bg-blue-800 p-2 text-gray-100"
            onClick={handleOpenModalCart}
          >
            <img src={Cart} alt="Cart" className="w-6 h-6" />
            {totalCartItem.length > 0 ? (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                {totalCartItem.length}
              </span>
            ) : null}
          </button>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute">
        <path
          fill="#1d4ed8"
          fillOpacity="1"
          d="M0,288L48,293.3C96,299,192,309,288,277.3C384,245,480,171,576,149.3C672,128,768,160,864,170.7C960,181,1056,171,1152,181.3C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </header>
  );
};

export default Header;
