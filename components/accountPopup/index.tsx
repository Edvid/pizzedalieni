'use client';
import { ReactNode, useState } from "react";
import styles from './styles.module.css';

type popupKind = 'logged in' | 'log in' | 'sign up';
type inputType = 'text' | 'email' | 'password';

interface IDictionary<TValue> {
  [id: string]: TValue;
}

interface IInput {
    type: inputType;
    placeholder: string;
    label: string;
}

function Input(props: IInput){
  return (
    <div className="my-4">
      <p className="my-1">{props.label}</p>
      <input type={props.type} placeholder={props.placeholder} className="p-2 px-4 bg-gray-700 border-2 border-gray-600"/>
    </div>
  )
}

function FirstName() {
  return (
    <Input type="text" label="First Name" placeholder="Jenny"/>
  )
}

function LastName() {
  return (
    <Input type="text" label="Last Name" placeholder="Padding"/>
  )
}

function Email(){
  return (
    <Input type="email" label="E-email" placeholder="example@email.com"/>
  )
}

function Password() {
  return (
    <Input type="password" label="Password" placeholder="••••••••" />
  )
}

function RepeatPassword() {
  return (
    <Input type="password" label="Repeat Password" placeholder="••••••••" />
  )
}

function PopupContainer (props: {children: ReactNode}) {
  return (
    <div className="fixed bg-gray-700 py-4 my-8 ml-[-12rem] px-[4rem]">
      {props.children}
    </div>
  )
}

export function AccountPopUp() {
  const [kind, setKind] = useState<popupKind>('log in');
  const [serverResponse, setServerReponse] = useState<ReactNode>('');

  async function signUp() {
    const data = {};
    let fetchReponseMessage: ReactNode = "";

    await fetch("http://localhost:3001/signup",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => {console.log(response); return response.json()})
    .then(response => fetchReponseMessage = <p className={styles[`response-kind-${response.kind}`] + ' font-bold'}>{response.msg}</p>);

    setServerReponse(fetchReponseMessage);
  }

  if (kind === 'sign up') {
    return (
      <PopupContainer>
        <h1 className="text-lg font-extrabold italic">Sign Up</h1>
        <FirstName/>
        <LastName/>
        <Email/>
        <Password/>
        <RepeatPassword/>
        {serverResponse}
        <button onClick={() => signUp()} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">Sign Up</button>
        <div className="my-4 h-[1px] bg-gray-400"></div>
        <p>Log in instead </p>
        <button onClick={() => { setKind('log in'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
      </PopupContainer>
    )
  }
  else if (kind === 'log in') {
    return (
      <PopupContainer>
        <h1 className="text-lg font-extrabold italic">Log In</h1>
        <Email/>
        <Password/>
        <button onClick={() => void(0)} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">Log In</button>
        <div className="my-4 h-[1px] bg-gray-400"></div>
        <p>Or Sign In With:</p>
        <div>
          <p>Goigle</p>
        </div>
        <div className="my-4 h-[1px] bg-gray-400"></div>
        <p>No Account? Register</p>
        <button onClick={() => { setKind('sign up'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
      </PopupContainer>
    );
  }
}

