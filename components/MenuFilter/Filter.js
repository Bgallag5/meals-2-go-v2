import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import pizzaIcon from "../../public/images/pizza-icon.png";
import saladIcon from "../../public/images/salad-icon.png";
import burgerIcon from "../../public/images/burger-icon2.png";
import Image from "next/image";

export default function Filter(props) {
  const { menuFilter, setMenuFilter } = props;

  const handleFilterClick = (filter) => {
    console.log(filter);
    if (filter == menuFilter) {
      setMenuFilter(undefined);
      return;
    }
    setMenuFilter(filter);
  };

  console.log(menuFilter);

  return (
    <>
      <div className="flex flex-row relative gap-6 justify-center align-center mx-auto h-auto border border-secondary rounded-full p-4">
        <div
          onClick={() => handleFilterClick("pizza")}
          className={`${
            menuFilter === "pizza" ? "filter-active" : ""
          } filter-option`}
          title={"Pizza"}
        >
          <Image
            src={pizzaIcon}
            //   layout={"fill"}
            height={40}
            width={40}
            className={"object-cover bg-cover pointer-events-none"}
            alt={"filter"}
          />
        </div>
        <div
          onClick={() => handleFilterClick("salad")}
          className={`${
            menuFilter === "salad" ? "filter-active" : ""
          } filter-option`}
          title={"Salads"}
        >
          <Image
            src={saladIcon}
            //   layout={"fill"}
            height={40}
            width={40}
            className={"object-cover bg-cover"}
            alt={"filter"}
          />
        </div>
        <div
          onClick={() => handleFilterClick("sandwich")}
          className={`${
            menuFilter === "sandwich" ? "filter-active" : ""
          } filter-option`}
          title={"Burgers"}
        >
          <Image
            src={burgerIcon}
            //  layout={"fill"}
            height={40}
            width={40}
            className={""}
            alt={"filter"}
          />
        </div>
      </div>
      <p className="text-center">Find what you&apos;re looking for</p>
    </>
  );
}
