import React, { useContext } from "react";
import { GlobalContext } from "../../store/GlobalStore";

export default function SliderItem(props) {
  const {
    title,
    discount,
    itemId,
    discountType,
    category,
    course,
    subtext,
    discountStr,
  } = props;
  const { setDeal } = useContext(GlobalContext);

  const handleClaimDeal = () => {
    if (!discount) return;
    let deal = {
      itemId,
      discountPercent: discount,
      discountType,
      category,
      course,
    };
    setDeal(deal);
  };

  return (
    <div onClick={() => handleClaimDeal()} id={itemId} className="slider-item">
        <div className="slider-half slider-half--front">

      <div className="flex flex-col items-center justify-start pt-6 gap-[20%] w-full h-40">
        <p className="text-xl">{discountStr}</p>
        <p>{discount ? title : "Placeholder"}</p>
      </div>
      <div className="h-8 flex my-auto w-full items-center justify-center  absolute bottom-0">
        <p className="text-[.7rem] h-8 flex  items-center shrink  flex-shink-1">
          {subtext}
        </p>
      </div>
        </div>
      <div className="slider-half slider-half--back">
       <button className="btn h-10 w-36 rounded-full bg-primary text-white text-lg shadow-sm hover:scale-[105%] active:translate-y-[1px] text-center">Claim Deal</button> 
      </div>
    </div>
  );
}
