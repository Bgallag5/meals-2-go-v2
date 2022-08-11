import React, { useContext } from "react";
import { GlobalContext } from "../../store/GlobalStore";

export default function SliderItem(props) {
  const { name, discount, itemId, discountType, category } = props;
  const { setDeal, deal } = useContext(GlobalContext);

  const handleClaimDeal = () => {
    let deal = {
      itemId,
      discountPercent: discount,
      discountType,
      category,
    };
    setDeal(deal);
  };
  console.log(deal);

  return (
    <div onClick={() => handleClaimDeal()} id={itemId} className="slider-item">
     <p>{name}</p>
    </div>
  );
}
