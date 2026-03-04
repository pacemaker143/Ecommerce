import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../Redux/slices/cartSlice";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (drawerOpen) {
      dispatch(fetchCart());
    }
  }, [drawerOpen, dispatch]);

  const cartItemCount = cart?.products?.length || 0;
  const totalPrice = cart?.totalPrice || 0;

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-comic-cream shadow-comic-xl transform transition-transform duration-300 flex flex-col z-50 border-l-4 border-comic-dark ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Comic header bar */}
      <div className="flex justify-between items-center p-4 bg-comic-yellow border-b-3 border-comic-dark">
        <h2 className="font-comic text-xl text-comic-dark flex items-center gap-2">
          🛒 Cart ({cartItemCount})
        </h2>
        <button
          onClick={toggleCartDrawer}
          className="comic-btn p-1.5 rounded-full bg-comic-red text-white border-2 border-comic-dark hover:scale-110 transition-transform"
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>

      {/* Cart contents with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <CartContent />
      </div>

      {/* Checkout button at bottom */}
      <div className="p-4 bg-white border-t-3 border-comic-dark">
        {totalPrice > 0 && (
          <div className="comic-card bg-comic-green/10 p-3 mb-3 text-right">
            <p className="font-comic text-lg text-comic-dark">
              Subtotal: <span className="text-comic-green font-bold text-xl">${totalPrice.toLocaleString()}</span>
            </p>
          </div>
        )}
        <button
          onClick={handleCheckout}
          disabled={cartItemCount === 0}
          className="comic-btn-primary w-full py-3 text-lg font-comic tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          💥 Proceed to Checkout!
        </button>
        <p className="text-xs font-body text-gray-500 mt-2 text-center">
          Shipping, taxes and discount codes calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
