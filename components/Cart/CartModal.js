import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../store/GlobalStore";
import CartItem from "./CartItem";
import { useRouter } from "next/router";

export default function CartModal() {
  const { cartItems, totalAmount, toggleCartModal, cartModalOpen } = useContext(GlobalContext);
  const modalRef = useRef();
  const router = useRouter();

  const handleCheckoutClick = () => {
    toggleCartModal(false)
    router.push('/checkout')
  }
  return (
    <div
      onClick={() => toggleCartModal(false)}
      ref={modalRef}
      className={`${cartModalOpen ? "" : "modal-hidden"}  cart-modal-backdrop`}
    >
      <span
        onClick={() => toggleCartModal(false)}
        className="fixed top-[3%] right-[3%] h-8 w-8 rounded-full overflow-hidden bg-red-900 text-white flex justify-center items-center cursor-pointer hover:bg-red-500"
      >
        X
      </span>
      {cartItems && (
        <div
          //stopPropagation - prevent clicks from bubbling to parent (closes modal)
          onClick={(e) => e.stopPropagation()}
          className={`cart ${
            cartModalOpen ? "cart-visible" : ""
          } fixed  p-3 flex flex-col  top-0 right-0 overflow-y-scroll   h-screen min-h-[65%] w-1/3 2xl:w-1/4 z-50 bg-white`}
        >
          <span className="relative h-10 flex flex-row items-center w-full p-2 my-4 justify-center group">
            <button onClick={() => handleCheckoutClick()} data-tooltip-target="tooltip-default" disabled={cartItems.length < 1} className="btn-checkout ">Checkout: ${totalAmount}</button>
            <span id="tooltip-default" role={'tooltip'} className={`${cartItems.length < 1 ? 'group-hover:opacity-100' : ""} absolute bottom-0 left-[50%] -translate-x-[50%] tooltip opacity-0 translate-y-[150%] h-full  bg-slate-500 rounded-lg flex items-center justify-center z-20 p-2 transition-all duration-700 ease-in-out overflow:hidden`}>
              <p>No Items In Cart</p>
              <div className="tooltip-arrow absolute rotate-45 transform origin-bottom-left top-0 left-[10%] h-4 w-4 bg-slate-500 triangle z-10 -translate-y-[70%]" data-popper-arrow></div>
              
              </span>
          </span>
          <div className="relative flex-grow-1 flex-shrink w-full ">
            {cartItems.map((item) => {
              return <CartItem item={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
