import React, { useState, useEffect } from "react";
import Image from "next/image";
import MenuModal from "../MenuModal/MenuModal";

export default function TopItemCard({ item }) {
  const { priceIcon, name, image, id, price } = item;
  const [modalState, setModalState] = useState(undefined);

  const showItemModal = (item) => {
    setModalState(item);
  };

  useEffect(() => {
    if (modalState) {
      document.getElementById("menu-modal").classList.remove("modal-hidden");
    }
  });

  return (
    <>
      {modalState && <MenuModal item={item} setModalState={setModalState} />}
      <div
        onClick={() => showItemModal(item)}
        data-price={priceIcon.length}
        className=" group top-menu-item cursor-pointer  h-64 lg:h-72 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 relative bg-cover rounded-md overflow-hidden shadow-lg"
      >
        <Image
          alt={"top-item"}
          loading={"lazy"}
          className="skeleton object-cover top-menu-img"
          layout="fill"
          src={require(`../../public/images/${image}`)}
        />
        <div className="skeleton group-hover:bg-slate-200 !bg-white h-12 absolute left-0 bottom-0 w-full flex flex-row items-center justify-between px-4">
          <h3>{name}</h3>
          <span className="h-auto w-auto bg-secondary rounded-full p-1 px-[1rem]">
            {priceIcon}
          </span>
        </div>
      </div>
    </>
  );
}
