import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../store/GlobalStore";

export default function AppMessage(props) {
  const { appMessage, clearAppMessage } = useContext(GlobalContext);
//   console.log(appMessage);

  //clear app message after 'timer' seconds
  useEffect(() => {
    if (appMessage?.msg) {
      setTimeout(() => {
        clearAppMessage();
      }, appMessage.timer * 1000);
    }
  }, [appMessage, clearAppMessage]);

  return (
    <>
      {appMessage.msg && (
        <div
          className={`app-message ${appMessage.msg && "app-message--active"}`}
        >
         <p>{appMessage.msg}</p> 
         <p className="scale-150">{appMessage.emoji}</p> 
        </div>
      )}
    </>
  );
}
