'use client'
import { useState } from "react";
import AvatarButton from "./Button";
import AvatarPopUpForm from "./popUpForm";

const userStates = {
  LogIn: 'log in',
  SignUp: 'sign up',
  LoggedIn: 'logged in'
} as const;

type ObjectValues<T> = T[keyof T];

export type userState = ObjectValues<typeof userStates>;

function Avatar() {
  const [userState, setUserState] = useState<userState>('log in');
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
