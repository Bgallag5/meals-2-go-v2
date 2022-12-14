import React from "react";
import Image from "next/image";
import Spinner from "../Spinner/Spinner";

export default function SearchResults(props) {
  const { item, handleSearchClick } = props;
  return (
    <div
      disabled={true}
      onClick={() => handleSearchClick(item)}
      className="search-result cursor-pointer relative hover:scale-[103%] group z-20 flex p-2 flex-col h-auto w-full rounded-b-lg"
    >
      <div className="h-16 w-full flex flex-row justify-between m-0 p-0 relative text-sm">
        <div className="flex flex-row flex-1  gap-1">
          <p className="flex flex-1 justify-center">{item.name}</p>
          <p className="w-20 text-center">{item.price && `$${item.price}`}</p>
        </div>
        <div className="relative h-full rounded-md overflow-hidden w-20 ">
          {item.image && (
            <Image
              className="object-cover rouned-md skeleton"
              layout={"fill"}
              src={require(`../../public/images/${item.image}`)}
              alt={"result"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
