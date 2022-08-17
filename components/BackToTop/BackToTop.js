import React, {useRef, useEffect} from 'react';
import styles from './BackToTop.module.css';
import { faArrowCircleUp, faArrowTrendUp, faAngleUp, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BackToTop() {

    const topRef = useRef();

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    useEffect(() => {
    //prevent scroll when sidebar is open
    window.onscroll = function () {
        console.log(window.scrollY);
        if (window.scrollY >= 850){
            topRef.current?.classList.add(`${styles.visible}`)
        } else{
            topRef.current?.classList.remove(`${styles.visible}`)
        }
      };

    }, []);

    // console.log(window.scrollY);

  return (
    <button ref={topRef} onClick={() => scrollToTop()} className={styles.btnTop}><FontAwesomeIcon icon={faAngleUp} /></button>
  )
}
