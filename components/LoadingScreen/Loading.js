import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../store/GlobalStore";
import styles from "./Loading.module.css";
import Spinner from "../Spinner/Spinner";

export default function Loading() {
  const { loading } = useContext(GlobalContext);
  return (
    <div
      className={`${
        loading === true ? "" : styles.hidden
      } fixed bg-black/50 h-screen w-screen top-0 left-0 z-50 text-white flex justify-center items-center`}
    >
      <div>
        <Spinner />
      </div>
    </div>
  );
}
