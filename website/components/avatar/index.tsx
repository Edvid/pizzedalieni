'use client'
import { useState } from "react";
import AvatarButton from "./Button";
import AvatarPopUpForm from "./popUpForm";
import { userState } from "@/utils/userStates";

function Avatar() {
  console.log(document.cookie)
  const [userState, setUserState] = useState<userState>(document.cookie? 'logged in' : 'log in');
  const [showPopup, setShowPopup] = useState(false)

  const toggleShow = () => {
    setShowPopup(!showPopup);
  }

  function changeKind(newUserState: userState){
    setUserState(newUserState);
  }

  return (
    <div>
      <AvatarButton onClick={toggleShow} userState={userState}/>
      <div>
        {
          showPopup ?
            <AvatarPopUpForm onChangeUserState={changeKind} userState={userState}/> :
            ""
        }
      </div>
    </div>
  )
}

export default Avatar;
