import React, {useContext, useEffect} from "react";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { GlobalContext } from "../store/GlobalStore";

export default function OrderPlaced() {
  const { clearState} = useContext(GlobalContext);
    const router = useRouter();

    const handleReturnToSite = () => {
        router.replace('/')
    }

    //on page load, reset all state to initialState (cart, deal, filters, loading )
    useEffect(() => {
      clearState();
    }, [clearState])

  return (
    <div className="order-placed">
      <div>
        <h1 className="text-[2rem] text-primary mb-1">We&apos;ve got your order!</h1>
        <p>check your email for the order confirmation</p>
      </div>
      <div onClick={handleReturnToSite} className="flex flex-row items-center gap-3 cursor-pointer hover:text-primary">
        <p>return to site </p> <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}
