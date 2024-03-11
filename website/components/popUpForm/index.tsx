import React, {ReactNode, useState} from 'react'

import Input, { InputDictionary } from '@/components/input';
import { ServerResponseRenderer as APIRenderer, Log} from './serverresponserenderer';
type popupKind = 'logged in' | 'log in' | 'sign up';

import LoginSubmit from './loginSubmit';
import SignupSubmit from './signupSubmit';

function PopupContainer (props: {children: ReactNode}) {
  return (
    <div className="fixed w-[24em] bg-gray-700 py-4 my-8 ml-[-12rem] px-[4rem]">
      {props.children}
    </div>
  )
}


interface IPopupFormKind {
  APIResponse: Log[];
  onFormSubmit: Function;
  onChangeKind: (arg0: popupKind) => void;
}

function SignUp(props: IPopupFormKind) {
  const [inputs, setInputs] = useState<InputDictionary>({});

  function eventHandler (changedInput: any) {
    var newInputs: InputDictionary = {...inputs};
    for (const [k, v] of Object.entries<string>(changedInput)) {
      newInputs[k] = v;
    }
    setInputs(newInputs);
  }

  return (
    <PopupContainer>
      <h1 className="text-lg font-extrabold italic">Sign Up</h1>
      <Input label="First Name" onChange={eventHandler}/>
      <Input label="Last Name" onChange={eventHandler}/>
      <Input label="E-mail" onChange={eventHandler}/>
      <Input label="Password" onChange={eventHandler}/>
      <Input type="password" label="Repeat Password" onChange={eventHandler}/>
      <APIRenderer responses={props.APIResponse}/>
      <SignupSubmit data={inputs} onSubmit={props.onFormSubmit}/>
      <div className="my-4 h-[1px] bg-gray-400"></div>
      <p>Log in instead </p>
      <button onClick={() => { props.onChangeKind('log in'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
    </PopupContainer>
  )
}

function LogIn(props: IPopupFormKind) {
  const [inputs, setInputs] = useState<InputDictionary>({});

  function eventHandler (changedInput: any) {
    var newInputs: InputDictionary = {...inputs};
    for (const [k, v] of Object.entries<string>(changedInput)) {
      newInputs[k] = v;
    }
    setInputs(newInputs);
  }

  return (
    <PopupContainer>
      <h1 className="text-lg font-extrabold italic">Log In</h1>
      <Input label="E-mail" onChange={eventHandler}/>
      <Input label="Password" onChange={eventHandler}/>
      <APIRenderer responses={props.APIResponse}/>
      <LoginSubmit data={inputs} onSubmit={props.onFormSubmit}/>
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
  const [APIResponse, setAPIResponse] = useState<Log[]>([]);
  const states: {[index in popupKind]: ReactNode} = {
    'log in': <LogIn APIResponse={APIResponse} onFormSubmit={setAPIResponse} onChangeKind={changeKind}/>,
    'sign up': <SignUp APIResponse={APIResponse} onFormSubmit={setAPIResponse} onChangeKind={changeKind}/>,
    'logged in': <h1></h1>
  }

  function changeKind(_kind: popupKind){
    setAPIResponse([]);
    setKind(_kind);
  }

  return (
    states[kind]
  )
}
