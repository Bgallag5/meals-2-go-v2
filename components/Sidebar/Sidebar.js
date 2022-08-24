import {
  faHeart,
  faWallet,
  faQuestion,
  faTag,
  faUsers,
  faTruck,
  faArrowLeft,
  faBurger
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/router";

export default function Sidebar() {

  const router = useRouter()

  const handleHideSidebar = () => {
    document.querySelector('body').classList.remove('popup-active')
    const sidebarRef = document.querySelector("#sidebar");
    sidebarRef.style.transform = "translateX(-100%)";

    const popupRef = document.querySelector(".sidebar-backdrop");
    popupRef.style.width = "0%";
    popupRef.style.height = "0%";
    popupRef.style.transform = "scale(1)";
  };

  const handleNavigate = (path) => {
    if (!path) return

    handleHideSidebar()
    router.push(path)
  }


  return (
    <>
      <div
      onClick={handleHideSidebar}
        className="sidebar-backdrop"
      ></div>
      <div
        id="sidebar"
        className="fixed flex flex-col top-0 left-0 h-screen w-64 bg-white z-30 transition-all duration-500 -translate-x-[100%]"
      >
        <div className="p-5 relative flex flex-row items-center gap-1 h-16">
          <h1 className="text-xl">Best</h1>{" "}
          <h1 className="text-xl font-bold">Eats</h1>
          <span
            onClick={handleHideSidebar}
            className="absolute cursor-pointer h-full top-0 flex items-center right-3  text-lg"
          >
            <FontAwesomeIcon className="text-base text-red-500 border border-black/40 rounded-full h-6 w-6 p-1" icon={faArrowLeft} />
          </span>
        </div>

        <div className="flex flex-col gap-3 w-full h-auto mt-4">
          <SidebarItem path={'/menu'} title={"Menu"} icon={faBurger} handleNavigate={handleNavigate} />
          <SidebarItem title={"Orders"} icon={faTruck} handleNavigate={handleNavigate} />
          <SidebarItem title={"Favorites"} icon={faHeart} handleNavigate={handleNavigate} />
          <SidebarItem title={"Help"} icon={faQuestion} handleNavigate={handleNavigate} />
          <SidebarItem title={"Promotions"} icon={faTag} handleNavigate={handleNavigate} />
          <SidebarItem title={"Invite Friends"} icon={faUsers} handleNavigate={handleNavigate} />
        </div>
      </div>
    </>
  );
}
