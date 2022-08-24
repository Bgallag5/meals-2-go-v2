import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../store/GlobalStore";
import Transition from "react-transition-group/Transition";

export default function AppMessage(props) {
  const { appMessage, clearAppMessage } = useContext(GlobalContext);

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
