import React from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
    const router = useRouter()
  return (
    <div className=" flex flex-col shadow-sm shadow-black justify-center rounded-sm overflow-hidden relative text-2xl sm:text-3xl md:text-4xl font-bold bg-black text-white w-full h-[35vh] lg:h-[50vh] 2xl:h-[65vh] pl-8 md:pl-24">
      <div id="hero" className=" h-[65vh] w-full"></div>
      <div className="absolute">
        <h1>
          The <span className="text-primary">Best</span>
        </h1>
        <h1>
          <span className="text-primary">Food</span> Delivered
        </h1>
        <div onClick={() => router.push('/menu')}  className="text-base cursor-pointer active:translate-y-[1px] flex flex-row items-center text-center gap-2 mt-3 w-fit hover:text-primary "><h3 className="">Full Menu</h3><FontAwesomeIcon className="translate-y-[1px]" icon={faArrowRight}/></div>
      </div>
    </div>
  );
}
