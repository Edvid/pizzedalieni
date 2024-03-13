import React, {ReactNode, useState} from 'react'

import Input, { InputDictionary } from '@/components/input';
import { ServerResponseRenderer as APIRenderer} from './serverresponserenderer';

export interface Log {
  msg: string;
  kind: 'error' | 'warning' | 'ok';
}

export interface CommonAPIResponse {
  logs: Log[]
}

import LoginSubmit, { LoginAPIResponse } from './loginSubmit';
import SignupSubmit from './signupSubmit';
import PopupContainer from './popupcontainer';
import { userState, userStates } from '@/utils/userStates';
import setCookie from '@/utils/setCookie';

interface IPopupForm {
  userState: userState;
  onChangeUserState: (userStateToChangeTo: userState) => void;
}

interface IPopupFormKind {
  onChangeUserState: (userStateToChangeTo: userState) => void;
}

function SignUp(props: IPopupFormKind) {
  const [inputs, setInputs] = useState<InputDictionary>({});
  const [APILogs, setAPILogs] = useState<Log[]>([]);

  function eventHandler (changedInput: any) {
    var newInputs: InputDictionary = {...inputs};
    for (const [k, v] of Object.entries<string>(changedInput)) {
      newInputs[k] = v;
    }
    setInputs(newInputs);
  }

  function onSignupSubmit (response: CommonAPIResponse) {
    setAPILogs(response.logs);
  }

  return (
    <PopupContainer>
      <h1 className="text-lg font-extrabold italic">Sign Up</h1>
      <Input label="First Name" onChange={eventHandler}/>
      <Input label="Last Name" onChange={eventHandler}/>
      <Input label="E-mail" onChange={eventHandler}/>
      <Input label="Password" onChange={eventHandler}/>
      <Input type="password" label="Repeat Password" onChange={eventHandler}/>
      <APIRenderer logs={APILogs}/>
      <SignupSubmit data={inputs} onSubmit={onSignupSubmit}/>
      <div className="my-4 h-[1px] bg-gray-400"></div>
      <p>Log in instead </p>
      <button onClick={() => { props.onChangeUserState(userStates.LogIn); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
    </PopupContainer>
  )
}

function LogIn(props: IPopupFormKind) {
  const [inputs, setInputs] = useState<InputDictionary>({});
  const [APILogs, setAPILogs] = useState<Log[]>([]);

  function eventHandler (changedInput: any) {
    var newInputs: InputDictionary = {...inputs};
    for (const [k, v] of Object.entries<string>(changedInput)) {
      newInputs[k] = v;
    }
    setInputs(newInputs);
  }

  function hasLoginToken(response: CommonAPIResponse): response is LoginAPIResponse {
    return "token" in response;
  }

  function containsOnlyOKLogs(response: CommonAPIResponse): Boolean {
    return response.logs
      .map((r) => r.kind)
      .filter((k) => k !== 'ok')
      .length === 0
  }

  function onLoginSubmit (response: CommonAPIResponse) {
    setAPILogs(response.logs);
    if(hasLoginToken(response)){
      if(containsOnlyOKLogs(response)){
        console.log("toot of victory")
        setTimeout(() => {
          const { token, userInfo } = response;
          const firstname = userInfo && userInfo.firstname ? userInfo.firstname : 'unknown';
          setCookie("token", token? token : "");
          setCookie("firstname", firstname);
          props.onChangeUserState('logged in');
        }, 1000);
      }
    }
  }

  return (
    <PopupContainer>
      <h1 className="text-lg font-extrabold italic">Log In</h1>
      <Input label="E-mail" onChange={eventHandler}/>
      <Input label="Password" onChange={eventHandler}/>
      <APIRenderer logs={APILogs}/>
      <LoginSubmit data={inputs} onSubmit={onLoginSubmit}/>
      <div className="my-4 h-[1px] bg-gray-400"></div>
      <p>No Account? Register</p>
      <button onClick={() => { props.onChangeUserState(userStates.SignUp); }} className="rounded-lg px-2 py-1 mt-2 bg-orange-500 hover:bg-transparent border-2 border-orange-500">here</button>
    </PopupContainer>
  )
}

export default function AvatarPopUpForm(props: IPopupForm) {
  const states: {[index in userState]: ReactNode} = {
    'log in': <LogIn onChangeUserState={props.onChangeUserState}/>,
    'sign up': <SignUp onChangeUserState={props.onChangeUserState}/>,
    'logged in': <h1></h1>
  }

  return (
    states[props.userState]
  )
}
