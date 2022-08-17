import React, { useEffect, useRef, useContext } from "react";
import $ from "jquery";
import { GlobalContext } from "../../store/GlobalStore";

export default function CookieMessage() {
  const { userCookie } = useContext(GlobalContext);
  const cookieRef = useRef();
  const okRef = useRef();

  const handleCookieBtnClick = (e) => {
    console.log(e.target.dataset.confirm);
    if (e.target.dataset.confirm == "false") {
      window.location.assign("https://www.google.com/");
      return;
    }
    cookieRef.current.classList.remove("cookie-visible");
    setCookie("user", "username", 1);
  };

  //dont show cookie message if user already has a cookie saved
  useEffect(() => {
    setTimeout(() => {
      if (userCookie) {
        cookieRef.current?.classList.remove("cookie-visible");
        return;
      } else if (!userCookie) {
        cookieRef.current?.classList.add("cookie-visible");
      }
    }, 2000);
  }, [userCookie]);

  //set a cookie to expire in x days
  function setCookie(name, value, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    let expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires}`;
    // document.cookie = `${name}=${value};${expires};path=/`
  }


  return (
    <div
      ref={cookieRef}
      className="cookie fixed flex flex-row gap-3 justify-center items-center  bottom-0 left-0 w-full bg-blue-300"
    >
      <div className="mr-4">This site uses cookies!</div>
      <button
        ref={okRef}
        onClick={(e) => handleCookieBtnClick(e)}
        data-confirm={"true"}
        className={"cookie__btn"}
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
    </div>
  );
}
