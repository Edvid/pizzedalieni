'use client';
import { ReactNode, useState } from "react";
import Input from '@/components/input';
import {ServerResponseRenderer as APIRenderer, Log} from './serverresponserenderer';

type popupKind = 'logged in' | 'log in' | 'sign up';

function PopupContainer (props: {children: ReactNode}) {
  return (
    <div className="fixed w-[24em] bg-gray-700 py-4 my-8 ml-[-12rem] px-[4rem]">
      {props.children}
    </div>
  )
}

export function AccountPopUp() {
  const [kind, setKind] = useState<popupKind>('log in');
  const [serverResponse, setServerReponse] = useState<Log[]>([]);
  const [inputs, setInputs] = useState<{[index: string]: string}>({});

  function changeKind(_kind: popupKind){
    setServerReponse([]);
    setKind(_kind);
  }

  function eventHandler (changedInput: any) {
    var newInputs: {[index: string]: string} = {...inputs};
    for (const [k, v] of Object.entries<string>(changedInput)) {
      newInputs[k] = v;
    }
    setInputs(newInputs);
  }

  async function signUp() {
    var data: {[index: string]: string} = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeatpassword: ""
    };

    for (const [k, v] of Object.entries(inputs)) {
      if (inputs[k]) data[k] = v;
    }

    console.log(data);

    await fetch("http://localhost:3001/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => { return response.json() })
    .then(response => { console.log(response); setServerReponse(response.logs as Log[]) });
  }

  async function logIn() {
    var data: {[index: string]: string} = {
      email: "",
      password: ""
    };

    for (const [k, v] of Object.entries(inputs)) {
      if (inputs[k]) data[k] = v;
    }

    await fetch("http://localhost:3001/login",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => { return response.json() })
    .then(response => {console.log(response); setServerReponse(response.logs as Log[]) });

  }

  if (kind === 'sign up') {
    return (
      <PopupContainer>
        <h1 className="text-lg font-extrabold italic">Sign Up</h1>
        <Input label="First Name" onChange={eventHandler}/>
        <Input label="Last Name" onChange={eventHandler}/>
        <Input label="E-mail" onChange={eventHandler}/>
        <Input label="Password" onChange={eventHandler}/>
        <Input type="password" label="Repeat Password" onChange={eventHandler}/>
        <APIRenderer responses={serverResponse}/>
        <button onClick={() => signUp()} className="roundee-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">Sign Up</button>
        <div className="my-4 h-[1px] bg-gray-400"></div>
        <p>Log in instead </p>
        <button onClick={() => { changeKind('log in'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
      </PopupContainer>
    )
  }
  else if (kind === 'log in') {
    return (
      <PopupContainer>
        <h1 className="text-lg font-extrabold italic">Log In</h1>
        <Input label="E-mail"/>
        <Input label="Password"/>
        <APIRenderer responses={serverResponse}/>
        <button onClick={() => logIn()} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">Log In</button>
        <div className="my-4 h-[1px] bg-gray-400"></div>
        <p>Or Sign In With:</p>
        <div>
          <p>Goigle</p>
        </div>
        <div className="my-4 h-[1px] bg-gray-400"></div>
        <p>No Account? Register</p>
        <button onClick={() => { changeKind('sign up'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
      </PopupContainer>
    );
  }
}

