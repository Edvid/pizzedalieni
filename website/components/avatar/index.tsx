'use client'
import { useState } from "react";
import AvatarButton from "./Button";
import AvatarPopUpForm from "./popUpForm";
import { userState, userStates } from "@/utils/userStates";
import getCookie from "@/utils/cookie/getCookie";

function Avatar() {
  const [userState, setUserState] = useState<userState>(getCookie("token") ? userStates.LoggedIn : userStates.LogIn );
  const [showPopup, setShowPopup] = useState(false)

  const toggleShow = () => {
    setShowPopup(!showPopup);
  }

  function changeKind(newUserState: userState){
    setShowPopup(false);
    setUserState(newUserState);
    window.location.reload();
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
