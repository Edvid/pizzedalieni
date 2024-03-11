import React, {ReactNode, useState} from 'react'

import Input, { InputDictionary } from '@/components/input';
import { ServerResponseRenderer as APIRenderer} from './serverresponserenderer';
type popupKind = 'logged in' | 'log in' | 'sign up';

export interface Log {
  msg: string;
  kind: 'error' | 'warning' | 'ok';
}

export interface CommonAPIResponse {
  logs: Log[]
}

import LoginSubmit, { LoginAPIResponse } from './loginSubmit';
import SignupSubmit from './signupSubmit';

function PopupContainer (props: {children: ReactNode}) {
  return (
    <div className="fixed w-[24em] bg-gray-700 py-4 my-8 ml-[-12rem] px-[4rem]">
      {props.children}
    </div>
  )
}


interface IPopupFormKind {
  onChangeKind: (kindToChangeTo: popupKind) => void;
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
      <button onClick={() => { props.onChangeKind('log in'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
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

  function containsOnlyOKLogs(response: LoginAPIResponse): Boolean {
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
          //log in
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
      <p>Or Sign In With:</p>
      <div>
        <p>Goigle</p>
      </div>
      <div className="my-4 h-[1px] bg-gray-400"></div>
      <p>No Account? Register</p>
      <button onClick={() => { props.onChangeKind('sign up'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
    </PopupContainer>
  )
}

export default function PopUpForm() {
  const [kind, setKind] = useState<popupKind>('log in');
  const states: {[index in popupKind]: ReactNode} = {
    'log in': <LogIn onChangeKind={changeKind}/>,
    'sign up': <SignUp onChangeKind={changeKind}/>,
    'logged in': <h1></h1>
  }

  function changeKind(_kind: popupKind){
    setKind(_kind);
  }

  return (
    states[kind]
  )
}
