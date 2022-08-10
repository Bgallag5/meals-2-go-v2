import React, { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from "../../store/GlobalStore";
import TopItemCard from "./TopItemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function TopRatedItems() {
  const [filter, setFilter] = useState(null);
  // const [menuItems, setMenuItems] = useState(null);

  const { menuItems, totalAmount } = useContext(GlobalContext);
  const router = useRouter();

  //save filter number - styles the button
  const handleFilterPrice = (e) => {
    if (filter === e.target.dataset.price) {
      setFilter(null);
      return;
    }

    setFilter(e.target.dataset.price);
  };

  const handleFilterItems = () => {};

  useEffect(() => {
    const items = document.querySelectorAll(".top-menu-item");

    items.forEach((item) => {
      //remove previous filter
      item.classList.remove("filter__hidden");

      //no filter - return after removing "hidden" from all items
      if (filter === null) return;
      if (item.dataset.price === filter) {
        return;
      } else {
        //hide element from list
        item.classList.add("filter__hidden");
      }
    });
  }, [filter]);
  

  return (
    <div className="flex flex-col gap-1 w-full h-auto min-h-screen mb-10">
      <h1 className="text-center text-3xl text-primary">
        Top Rated Menu Items
      </h1>
      <div className="w-full h-32 flex flex-col gap-2 justify-center items-center">
        <p>Filter Price</p>
        <div className="flex flex-row gap-8 w-full h-auto justify-center">
          <button
            onClick={(e) => handleFilterPrice(e)}
            className={`${
              filter == "1" ? "btn__filter--active" : ""
            } btn btn__filter w-12 h-12 flex justify-center p-1`}
            data-price={"1"}
          >
            {"$"}
          </button>
          <button
            onClick={(e) => handleFilterPrice(e)}
            className={`${
              filter == "2" ? "btn__filter--active" : ""
            } btn btn__filter w-12 h-12 flex justify-center p-1`}
            data-price={"2"}
          >
            {"$$"}
          </button>
          <button
            onClick={(e) => handleFilterPrice(e)}
            className={`${
              filter == "3" ? "btn__filter--active" : ""
            } btn btn__filter w-12 h-12 flex justify-center p-1`}
            data-price={"3"}
          >
            {"$$$"}
          </button>
          <button
            onClick={() => setFilter(null)}
            className={`btn w-12 h-12 flex justify-center p-1 bg-white text-black border border-black active:bg-secondary`}
          >
            {"Clear"}
          </button>
        </div>
      </div>
      <div className="w-full h-auto justify-center flex flex-row gap-3 gap-y-8 flex-wrap ">
        <TopItemCard
          item={menuItems.find(el =>  el.name == "Morning Burger")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "American Classic")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "The Chicken Burger")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "Feta & Arugala Pizza")}
        />
        {/* <TopItemCard
          item={menuItems.find(el =>  el.name == "Asian Slaw Salad")}
        /> */}
        {/* <TopItemCard
          item={menuItems.find(el =>  el.name == "White Veggie")}
        /> */}
        <TopItemCard
          item={menuItems.find(el =>  el.name == "BBQ Chicken Pizza")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "Cheese Pizza")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "Kale Salad")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "Ceasar Salad")}
        />
        <TopItemCard
          item={menuItems.find(el =>  el.name == "Fruit Salad")}
        />
      </div>
      <div
        
        className="flex justify-center mt-24 "
      >
        <div 
        onClick={() => router.push("/menu")}
        className="flex flex-row gap-4 w-content items-center cursor-pointer justify-center hover:text-primary hover:scale-[110%]">

        <h2>View Full Menu </h2>
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        </div>
      </div>
    </div>
  );
}
