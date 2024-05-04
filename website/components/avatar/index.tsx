'use client'
import { useEffect, useState } from "react";
import AvatarButton from "./Button";
import AvatarPopUpForm from "./popUpForm";
import { userState, userStates } from "@/utils/userStates";
import getCookie from "@/utils/cookie/getCookie";

function xor(a: boolean, b: boolean): boolean {
  return a && !b || !a && b;
}

function Avatar() {
  const [userState, setUserState] = useState<userState>(userStates.LogIn);
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    setUserState(getCookie("token") ? userStates.LoggedIn : userStates.LogIn);
  }, []);

  const toggleShow = () => {
    setShowPopup(!showPopup);
  }

  function changeKind(newUserState: userState){
    const before: userState = userState;
    const shouldReload: boolean = xor(
      newUserState === userStates.LoggedIn,
      before === userStates.LoggedIn
    );
    setUserState(newUserState);
    if (shouldReload) {
      setShowPopup(false);
      window.location.reload();
    }
  }

  return (
    <div>
      <AvatarButton onClick={toggleShow} userState={userState}/>
      <div>
        {
          showPopup ?
            <AvatarPopUpForm onChangeUserState={changeKind} userState={userState} onClose={() => setShowPopup(false)}/> :
            ""
        }
      </div>
    </div>
  )
}

export default Avatar;
