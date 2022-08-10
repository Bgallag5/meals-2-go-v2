import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';

export default function CookieMessage() {
  const cookieRef = useRef();
  const okRef = useRef();

  const handleCookieBtnClick = (e) => {
    console.log(e.target.dataset.confirm);
    if (e.target.dataset.confirm == "false") {
      window.location.assign("https://www.google.com/");
      return;
    }

    cookieRef.current.classList.remove("cookie-visible");
  };

  useEffect(() => {
    setTimeout(() => {
      cookieRef.current.classList.add("cookie-visible");
    }, 2000);
  }, []);


useEffect(() => {
    const cookie = document.querySelector('.cookie')
    console.log(cookie);
    $(".ok-ref").on({
        mouseover: function() {
            console.log(cookieRef.current)
          $(this).css({
            left: (Math.random() * window.innerWidth) + 'px',
            top: (Math.random() * (cookieRef.current.clientHeight * .5)) + 'px',
          });
        }
      });
}, []);

useEffect(() => {
    setTimeout(() => {
        okRef.current.classList.add('ok-ref-still')
    }, 22000)
}, [])

  return (
    <div
      ref={cookieRef}
      className="cookie fixed flex flex-row gap-8  bottom-0 left-0 w-full bg-blue-300"
    >
      <button
        ref={okRef}
        onClick={(e) => handleCookieBtnClick(e)}
        data-confirm={"true"}
        className={"cookie__btn ok-ref fade-white"}
      >
        Ok
      </button>
      <button
        onClick={(e) => handleCookieBtnClick(e)}
        data-confirm={"false"}
        className={"cookie__btn"}
      >
        Leave
      </button>
      <div className="absolute top-[4rem] left-[35%] -translate-y-[50%] flex items-center h-[2.5rem]">
        This site uses cookies!
      </div>
      {/* <div className="flex w-[40vw] test flex-row fixed top-[2.5rem] left-[50%] -translate-x-[40%]  items-center justify-start gap-10">
        <div className="flex h-auto relative flex-row gap-2">
        </div>
      </div> */}
    </div>
  );
}
