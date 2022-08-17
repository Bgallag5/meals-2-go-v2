import React, { useRef, useContext } from "react";
import { GlobalContext } from "../../store/GlobalStore";
import Image from "next/image";

export default function MenuModal(props) {
  const { addToCart, setAppMessage } = useContext(GlobalContext);
  const { name, image, description, price, id, emoji } = props.item;
  const setModalState = props.setModalState;
  const modalRef = useRef();
  const quantityRef = useRef();

  const closeModal = () => {
    //first hide the modal
    modalRef.current.classList.add("modal-hidden");
    //second clear the modal state
    setModalState(null);
  };

  const handleAddToCart = () => {
    //get Number from data value
    let quant = Number(quantityRef.current.value);
    //dispatch item and quantity to add
    addToCart(props.item, quant);
    setAppMessage(`${name} Added!`, 2, emoji);
    closeModal();
  };

  return (
    <div
      id="menu-modal"
      ref={modalRef}
      onClick={closeModal}
      className="bg-white/50 z-40  fixed top-0 left-0 h-screen w-screen flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed p-4 pt-10 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-80 h-[auto] w-[30rem] py-8 px-2 bg-slate-100 border border-black rounded-md shadow-lg shadow-black/30"
      >
        <span
          onClick={closeModal}
          className="fixed top-1 right-1 h-6 w-6 rounded-full overflow-hidden bg-red-900 text-white flex justify-center items-center cursor-pointer hover:bg-red-500"
        >
          X
        </span>
        <div className="flex flex-row h-40 w-full border-b-[1px] border-black/50 pb-2 mb-2">
          <h1 className="w-1/2 flex items-center justify-center text-center text-3xl p-2 font-light">
            {name}
          </h1>
          <div className="h-full w-1/2 relative rounded-md overflow-hidden shadow-md shadow-black/30">
            <Image
              className="object-cover"
              src={require(`../../assets/images/${image}`)}
              layout="fill"
            />
          </div>
        </div>
        <p className="w-[90%] mx-auto">{description}</p>
        <div className="flex flex-row justify-center items-center mt-8 gap-2 w-full mx-auto">
          <p className="w-1/3 text-lg text-orange-700">${price}</p>
          <div className="flex flex-col gap-2 justify-center w-1/3 h-full p-1 mx-2">
            <div className="flex flex-row gap-1 justify-center">
              <label htmlFor={id}>Quantity</label>
              <input
                ref={quantityRef}
                defaultValue={1}
                className="w-10 text-center outline-none border-[1px] rounded border-black"
                id={id}
                type={"number"}
              />
            </div>
            <button
              onClick={() => handleAddToCart()}
              className="btn btn--add-item"
            >
              Add+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
