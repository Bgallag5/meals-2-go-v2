import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../store/GlobalStore";

import MenuItem from "../components/MainMenu/MenuItem";
import MenuModal from "../components/MenuModal/MenuModal";

export default function MainMenu() {
  const { menuItems, addToCart } = useContext(GlobalContext);

  const [modalState, setModalState] = useState(undefined);

  const showItemModal = (item) => {
    setModalState(item);
  };


  useEffect(() => {
    if (modalState) {
        document.getElementById('menu-modal').classList.remove('modal-hidden')
    }
  });

  return (
    <>
      <div className="flex flex-col bg-primary/80 rounded z-20">
        <h1 className="text-2xl text-center my-10">Main Menu</h1>
        <div className=" menu__section">
          <h1 className="menu__section-title">Starters</h1>
          <div className="menu__section-items">
            {menuItems &&
              menuItems.map((item) => {
                if (item.course !== "starter") return null;
                return <MenuItem item={item} showItemModal={showItemModal} />;
              })}
          </div>
        </div>
        <div className=" menu__section">
          <h1 className="menu__section-title">Entres</h1>
          <div className="menu__section-items">
            {menuItems &&
              menuItems.map((item) => {
                if (item.course !== "main") return null;
                return <MenuItem item={item} showItemModal={showItemModal} />;
              })}
          </div>
        </div>
        <div className=" menu__section">
          <h1 className="menu__section-title">Dessert</h1>
          <div className="menu__section-items">
            {menuItems &&
              menuItems.map((item) => {
                if (item.course !== "dessert") return null;
                return <MenuItem item={item} showItemModal={showItemModal} />;
              })}
          </div>
        </div>
      </div>
      {modalState && <MenuModal setModalState={setModalState} item={modalState} />}
    </>
  );
}