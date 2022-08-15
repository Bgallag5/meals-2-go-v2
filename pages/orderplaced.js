import React from "react";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function OrderPlaced() {
    const router = useRouter();

    const handleReturnToSite = () => {
        router.replace('/')
    }

  return (
    <div className="order-placed">
      <div>
        <h1 className="text-[2rem] text-primary mb-1">We've got your order!</h1>
        <p>check your email for the order confirmation</p>
      </div>
      <div onClick={handleReturnToSite} className="flex flex-row items-center gap-3 cursor-pointer hover:text-primary">
        <p>return to site </p> <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}
