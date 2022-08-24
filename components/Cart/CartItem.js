import React, { useContext } from "react";
import Image from "next/image";
import { GlobalContext } from "../../store/GlobalStore";

export default function CartItem({ item }) {
  const { cartItems, addToCart, decrementCartItem, deleteCartItem, deal } =
    useContext(GlobalContext);

  const handleUpdateQuantity = (e) => {
    e.preventDefault();
    let itemToUpdate = cartItems.find((el) => el.id == e.target.dataset.id);
    e.target.dataset.num == 1
      ? //dispatch item and it's quantity to be added
        addToCart(itemToUpdate, 1)
      : decrementCartItem(e.target.dataset.id);
    //set appmessage
  };

  //delete item from cart
  const handleDeleteItem = (e) => {
    e.preventDefault();
    deleteCartItem(e.target.dataset.id);
  };

  return (
    <div className="w-full my-1 h-36 flex flex-row lg:justify-between justify-center gap-5 bg-white shadow-md shadow-black/30 p-1 rounded-md border-black/30 border">
      <div className="relative hidden lg:inline h-26 rounded-md overflow-hidden border border-black/50 shadow-sm shadow-black/60 w-1/3 ">
        <Image
          className=""
          layout="fill"
          src={require(`../../assets/images/${item.image}`)}
        />
      </div>
      <div className="flex flex-col gap-1 text-center w-1/2 md:w-1/3 items-center justify-center">
        <h1 className="">{item.name}</h1>
        <h2>x {item.quantity}</h2>
        {/* if our deal was a single item deal: */}
        {item.itemDiscount ? (
          <h2
            data-price={Number(item.price * item.quantity)}
            className=" discount-price"
          >
            $
            {Number(
              item.price * Number(item.quantity - 1) +
                item.price *
                  ((100 - item.itemDiscount) / 100)
            ).toFixed(2)}
          </h2>
        ) : item.categoryDiscount ? (
          <>
          {/* if our deal was a category deal - (item.categoryDeal added in reducer): */}
          <h2
            data-price={Number(item.price * item.quantity)}
            className=" discount-price"
          >
            $
            {Number(
              item.price * Number(item.quantity - 1) +
                item.price *
                  ((100 - item.categoryDiscount) / 100)
            ).toFixed(2)}
          </h2>
          </>
        ) : (
          <h2 className="text-orange-600">
            $
            {Number(
              item.price * Number(item.quantity)
            ).toFixed(2)}
          </h2>
        )}
      </div>
      <div className="flex flex-col gap-1 items-center w-1/3  justify-center">
        <div className="flex w-auto flex-row justify-between gap-1">
          <button
            data-id={item.id}
            data-num={-1}
            onClick={(e) => handleUpdateQuantity(e)}
            className=" btn-cart-quantity  bg-secondary text-black"
          >
            -
          </button>
          <button
            data-id={item.id}
            data-num={1}
            onClick={(e) => handleUpdateQuantity(e)}
            className="  btn-cart-quantity "
          >
            +
          </button>
        </div>
        <button
          data-id={item.id}
          onClick={(e) => handleDeleteItem(e)}
          className=" btn-cart-delete"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
