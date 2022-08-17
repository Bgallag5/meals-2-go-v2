import React, { useRef, useEffect } from "react";
import styles from "./BackToTop.module.css";
import {
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BackToTop() {
  const topRef = useRef();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //if scrollY > 850 show back to top button
  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY >= 850) {
        topRef.current?.classList.add(`${styles.visible}`);
      } else {
        topRef.current?.classList.remove(`${styles.visible}`);
      }
    };
  }, []);

  return (
    <button
      ref={topRef}
      onClick={() => scrollToTop()}
      className={styles.btnTop}
    >
      <FontAwesomeIcon icon={faAngleUp} />
    </button>
  );
}
