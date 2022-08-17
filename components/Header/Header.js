import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../store/GlobalStore";
import SearchResults from "../SearchResults/SearchResults";
import MenuModal from "../MenuModal/MenuModal";
import Spinner from "../Spinner/Spinner";

export default function Header() {
  const { cartItems, cartModalOpen, toggleCartModal, menuItems} =
    useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [searchResults, setSearchResutls] = useState(null);
  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const headerRef = useRef();
  const searchResultsRef = useRef();
  const modalBackdropRef = useRef();

  const handleShowSidebar = () => {
    const sidebarRef = document.querySelector("#sidebar");
    sidebarRef.style.transform = "translateX(0)";

    const popupRef = document.querySelector(".sidebar-backdrop");
    popupRef.style.width = "100vw";
    popupRef.style.height = "100vh";
    popupRef.style.overflow = "hidden";
    popupRef.style.transform = "scale(1.5)";
    document.querySelector("body").classList.add("popup-active");

    //prevent scroll when sidebar is open
    window.onscroll = function () {
      return (window.scrollY = 0);
    };
  };

  const handleToggleCartModal = () => {
    let newCartState = !cartModalOpen;

    toggleCartModal(newCartState);
  };

  const handleSearchChange = (e) => {
    setSearchResutls(null);
    setLoading(true);
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  //set debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  //take searchTerm and filter matching menu items
  useEffect(() => {
    // if searchTerm map filter through the menu and return array of matching items
    if (!searchTerm) {
      return;
    }
    let matchingItems = [];
    menuItems.forEach((menuItem) => {
      let name = menuItem.name.toLowerCase();

      //if item name includes searchTerm - push to results arr
      if (name?.includes(debounceSearchTerm)) {
        matchingItems.push(menuItem);
      }
    });
    //after mapping results clear loading
    setLoading(false);
    //if no matching items - return a "disabled" "No Results"
    if (matchingItems.length < 1) {
      let noResults = [
        {
          name: "No Results",
          price: "",
          image: "",
          disabled: true,
        },
      ];
      setSearchResutls(noResults);
      return;
    }
    setSearchResutls(matchingItems);
  }, [debounceSearchTerm]);

  //click on results opens item modal
  const handleSearchClick = (item) => {
    //click on "No Results" does nothing
    if (item.disabled) return;
    setModal(item);
    clearSearchResults();
  };

  //clear search term and results - hide results
  const clearSearchResults = () => {
    setSearchResutls(null);
    setSearchTerm((prev) => "");
    searchResultsRef.current.classList.add("modal-hidden");
    modalBackdropRef.current.classList.add("modal-hidden");
  };

  //take cart items and set itemIDs to Local Storage 
  const saveCartItemsLS = (items) => {
    // let itemIDs = items.map(item => item.id);
    // console.log(itemIDs);
    let itemsToSave = [];
    items.forEach((item) => {
      itemsToSave.push({id: item.id, quantity: item.quantity})
    });
    console.log(itemsToSave);
    localStorage.setItem("cart_items", JSON.stringify(itemsToSave));
  }

  //on cartItems change save to LS
  useEffect(() => { 
    if (!cartItems.length) return;
    console.log(cartItems);
    saveCartItemsLS(cartItems);
  },[cartItems]);



  // //get cart item IDs from localStorage and set cart items on mount
  // useEffect(() => {
  //   const savedItemIDs = JSON.parse(localStorage.getItem("cart_items"));
  //   if (!savedItemIDs?.length) return
  //   console.log("SAVED ITEM IDS");
  //   console.log(savedItemIDs);
  //   let savedItems = [];

  //   for (const item of savedItemIDs){
  //     // console.log(item);
  //     // console.log(savedItemIDs?.includes(item.id));
  //     // if (savedItemIDs?.includes(item.id)){
  //     //   savedItems.push(item)
  //     // }
  //    let menuItem = menuItems.find(menuItem => menuItem.id === item.id);
  //    if (menuItem){
  //     let newItem = {
  //       ...menuItem,
  //       quantity: item.quantity,  
  //     }
  //     savedItems.push(newItem)
  //    }
  //   }
  //   console.log(savedItems); // quantity = undefined
  //   //THIS ALL WORKS FINE BUT RUNS TWICE, ADDING DOUBLE CART ITEMS 
  //   setTimeout(() => {
  //     savedItems.forEach(item => {
  //       console.log(item);
  //       //quantity is handled in reducer - need to pass in quantity separately from item
  //       let quantity = item.quantity;
  //       delete item.quantity;
  //       addToCart(item, quantity)
  //     });

  //   }, 3000)
  // }, []);

  // console.log(cartItems);



  return (
    <div
      ref={headerRef}
      className="w-full  mb-8 h-16 flex flex-row items-center justify-between"
    >
      {modal && <MenuModal setModalState={setModal} item={modal} />}
      <div className="relative flex flex-row gap-1 h-full items-center">
        <FontAwesomeIcon
          onClick={handleShowSidebar}
          className="cursor-pointer"
          icon={faBars}
        />
        <div
          onClick={() => router.push("/")}
          className="mx-2 flex flex-row gap-1 cursor-pointer"
        >
          <h1 className="text-xl">Best</h1>{" "}
          <h1 className="text-xl font-bold">Eats</h1>
        </div>
        <div className="flex flex-row">
          <input
            id="toggle-delivery"
            type={"checkbox"}
            className="input__toggle-delivery"
          ></input>
          <label className="label__toggle-delivery" htmlFor="toggle-delivery">
            <p id="delivery">Delivery</p>
            <p id="pickup">Pickup</p>
          </label>
        </div>
      </div>
      <div className="relative sm:flex  items-center justify-center w-96">
        <FontAwesomeIcon
          className="absolute z-30 left-2 text-slate-800 text-xs"
          icon={faSearch}
        />
        <input
          onChange={(e) => handleSearchChange(e)}
          value={searchTerm}
          placeholder="Search Foods..."
          className="w-full z-20 p-1 pl-8 rounded-full bg-slate-200 placeholder:text-slate-500 border-0 outline-0"
          type={"text"}
        ></input>
        {searchTerm && (
          <>
            <div
              onClick={clearSearchResults}
              ref={modalBackdropRef}
              className="fixed top-0 left-0 w-screen z-10 h-[100vh] bg-white/40 overflow-hidden"
            ></div>
            <div
              onClick={(e) => e.stopPropagation()}
              ref={searchResultsRef}
              id={"search-results"}
              className="absolute top-[50%] bg-white   z-10  max-h-[60vh] h-auto overflow-hidden overflow-y-scroll pb-4   border-[3px] border-black/80  w-full rounded-b-2xl"
            >
              <div className="h-10 w-full flex justify-center items-center relative "></div>
              {loading && <Spinner />}
              {searchResults?.map((item) => {
                return (
                  <SearchResults
                    item={item}
                    handleSearchClick={handleSearchClick}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      <div>
        <button
          disabled={cartItems?.length < 1}
          onClick={() => handleToggleCartModal()}
          className={`btn justify-center md:w-auto md:h-auto lg:px-6 md:py-2 relative`}
        >
          <div
            className={`${
              cartItems?.length > 0 ? "visible" : "invisible"
            } absolute top-0 right-0 flex items-center justify-center bg-secondary h-8 w-8 rounded-full translate-x-[35%] -translate-y-[20%] text-black`}
          >
            {cartItems && cartItems.length}
          </div>
          <FontAwesomeIcon icon={faCartShopping} />{" "}
          <p className="px-2 md:flex hidden">Cart</p>
        </button>
      </div>
    </div>
  );
}


