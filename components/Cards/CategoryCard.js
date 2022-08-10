import React from "react";
import Image from "next/image";

//images

export default function CategoryCard(props) {
  const { title, img } = props;

  return (
    <div className="relative h-40 w-full sm:w-1/3 rounded-lg  bg-black/40">
      <div className="absolute -z-10  bg-blend-darken bg-contain bg-center bg-no-repeat top-0 left-0 h-full w-full ">
        <Image className="rounded-lg object-cover" layout="fill" src={require(`../../assets/images/${img}`)} />
      </div>
      <div className="text-white text-shadow font-shadow text-2xl flex flex-col h-full p-4 items-start justify-between">
        <h3>{title}</h3>
        <button className="text-base btn btn-white">Order Now</button>
      </div>
    </div>
  );
}
