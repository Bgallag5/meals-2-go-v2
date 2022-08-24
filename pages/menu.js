import React, { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../store/GlobalStore";

import MenuItem from "../components/MainMenu/MenuItem";
import MenuModal from "../components/MenuModal/MenuModal";
import Filter from "../components/MenuFilter/Filter";
import BackToTop from "../components/BackToTop/BackToTop";

export default function MainMenu() {
  const { menuItems, menuFilter, setMenuFilter } = useContext(GlobalContext);

  const [modalState, setModalState] = useState(undefined);

  const showItemModal = (item) => {
    setModalState(item);
  };


  useEffect(() => {
    if (modalState) {
        document.getElementById('menu-modal').classList.remove('modal-hidden')
    }
  });

  //watch filter and style menu if filter
  useEffect(() => {
    let items = document.querySelectorAll('.menu-item');
    items.forEach(item => item.classList.remove('menu-item--active'))
    if (!menuFilter) return;

    items.forEach(item => {
      //if menuItem.category equals filter, add "active"
      if (item.dataset.category === menuFilter){
        item.classList.add("menu-item--active")
      }
    });
  }, [menuFilter]);


  //scroll to first filtered element
  useEffect(() => {
    if (!menuFilter) return;

    let items = document.querySelectorAll('.menu-item--active');
    if (!items) return;

    items[0].scrollIntoView({behavior: "smooth"});

  }, [menuFilter])

  return (
    <>
    <BackToTop />
      <div className="flex flex-col bg-primary/80 rounded z-20">
        <h1 className="text-2xl text-center my-10">Main Menu</h1>
        <div className=" menu__section">
          <Filter menuFilter={menuFilter} setMenuFilter={setMenuFilter} />
          <h1 className="menu__section-title">Starters</h1>
          <div className="menu__section-items">
            {menuItems &&
              menuItems.map((item) => {
                if (item.course !== "starter") return null;
                return <MenuItem key={item.id} item={item} showItemModal={showItemModal} />;
              })}
          </div>
        </div>
        <div className=" menu__section">
          <h1 className="menu__section-title">Entres</h1>
          <div className="menu__section-items">
            {menuItems &&
              menuItems.map((item) => {
                if (item.course !== "main") return null;
                return <MenuItem key={item.id} item={item} showItemModal={showItemModal} />;
              })}
          </div>
        </div>
        <div className=" menu__section">
          <h1 className="menu__section-title">Dessert</h1>
          <div className="menu__section-items">
            {menuItems &&
              menuItems.map((item) => {
                if (item.course !== "dessert") return null;
                return <MenuItem key={item.id} item={item} showItemModal={showItemModal} />;
              })}
          </div>
        </div>
      </div>
      {modalState && <MenuModal setModalState={setModalState} item={modalState} />}
    </>
  );
}