'use client'
import { useState } from "react";
import PopUpForm from "./popUpForm";

function Avatar() {
  const [showPopup, setShowPopup] = useState(false)

  const onclick = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div>
      <button type="button" onClick={onclick} className="rounded-lg px-4 py-2 m-[-8px] bg-teal-500 hover:bg-transparent border-2 border-teal-500">
        Log In
      </button>
      <div>
        {
          showPopup ?
            <PopUpForm/> :
            ""
        }
      </div>
    </div>
  )
}

export default Avatar;
