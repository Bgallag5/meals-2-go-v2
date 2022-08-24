import React, { useContext, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Cards/Categories";
import TopRatedItems from "../components/TopRatedItems/TopRatedItems";
import Deals from "../components/DealsSlider/Deals";
import { GlobalContext } from "../store/GlobalStore";
import CookieMessage from "../components/CookieMessage/CookieMessage";

//Homepage
export default function Home(props) {
  const { toggleCookie } = useContext(GlobalContext);
  const { cookie } = props;

  useEffect(() => {
    if (!cookie) return;
    else if (cookie) {
      toggleCookie();
    }
  }, [cookie, toggleCookie]);

  return (
    <div className="page__container">
      <Hero />
      <Categories />
      <TopRatedItems />
      <Deals />
      <CookieMessage />
    </div>
  );
}

export async function getServerSideProps(context) {
  let userCookie = context.req.cookies["user"];
  console.log(userCookie);

  return {
    props: {
      cookie: userCookie || null,
    },
  };
}
