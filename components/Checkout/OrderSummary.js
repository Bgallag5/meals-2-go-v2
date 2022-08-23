import React, { useContext } from "react";
import { deals } from "../../pages/api/dummy-data";
import { GlobalContext } from "../../store/GlobalStore";
import CartItem from "../Cart/CartItem";

export default function OrderSummary() {
  const { totalAmount, cartItems, deal } = useContext(GlobalContext);

  const OrderTotal = () => {
    if (deal?.discountType !== "order") {
      return (
        <span className="flex flex-row gap-4 w-full items-center justify-center text-3xl h-auto min-h-[8rem] ">
          Total:{" "}
          <h2 className="text-orange-600">
            {" "}
            ${Number(totalAmount).toFixed(2)}
          </h2>
        </span>
      );
    }
    if (deal?.discountType === "order") {

        let discountedTotal = Number(totalAmount) * Number((100 - deal.discountPercent)/ 100);
        console.log(discountedTotal);

      return (
        <span className="flex  flex-col gap-4 w-full items-center justify-center h-auto min-h-[8rem] ">
            <p>Discount: {deal.discountPercent}%</p>
        <span className="flex flex-row gap-4 items-center justify-center text-3xl">
          Total:{" "}
          <h2 className="text-black line-through">
            ${Number(totalAmount).toFixed(2)}
          </h2>
          <h2 className="text-orange-600">
            ${discountedTotal.toFixed(2)}
          </h2>
        </span>
      </span>
      );
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-center">
      {cartItems &&
        cartItems.map((item) => {
          return <CartItem item={item} />;
        })}
      <div>
          <OrderTotal />
      </div>
    </div>
  );
}
