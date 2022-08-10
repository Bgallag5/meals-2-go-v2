import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { GlobalContext } from "../../store/GlobalStore";

export default function MenuItem(props) {
  const { addToCart, cartItems, setAppMessage } = useContext(GlobalContext);
  const quantityRef = useRef();

  const { name, price, description, image, id, emoji } = props.item;
  const showItemModal = props.showItemModal;

  const handleAddToCart = () => {
    //get Number from data value
    let quant = Number(quantityRef.current.value);
    //dispatch item and quantity to add
    addToCart(props.item, quant);
    setAppMessage(`${name} Added!`, 2, emoji);
  };

  return (
    <div className="relative flex flex-row gap-6 h-32 bg-white w-full group ">
      {/* <div className='absolute top-0 left-[50%] h-32 w-32'>
            <Image src={require(`../../assets/images/${image}`)} layout="fill"/>
        </div> */}
      <div
        onClick={() => showItemModal(props.item)}
        className="cursor-pointer flex flex-col flex-1 max-w-2/3 group p-2 px-5"
      >
        <h2 className="text-xl ">{name}</h2>
        <p className="menu__description"> {description}</p>
        <p className="mt-3 text-orange-700">{price}</p>
      </div>
      <div className="relative h-32 w-32 opacity-0 transition-all ease-linear duration-300 group-hover:opacity-100">
        <Image
          className="object-cover rounded-sm"
          src={require(`../../assets/images/${image}`)}
          layout="fill"
        />
      </div>
      <div className="flex flex-col gap-2 justify-center w-32 h-full  p-1 mx-2">
        <div className="flex flex-row gap-1">
          <label htmlFor={id}>Quantity</label>
          <input
            ref={quantityRef}
            defaultValue={1}
            className="w-1/2 text-center outline-none border-[1px] rounded border-black"
            id={id}
            type={"number"}
          />
        </div>
        <button onClick={() => handleAddToCart()} className="btn btn--add-item">
          +Add
        </button>
      </div>
    </div>
  );
}
