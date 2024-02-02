'use client';
import { ReactNode, useState } from "react";
import styles from './styles.module.css';

type popupKind = 'logged in' | 'log in' | 'sign up';
type inputType = 'text' | 'email' | 'password';

interface IInput {
  type: inputType;
  placeholder: string;
  label: string;
}

interface Log {
  kind: 'error' | 'warning' | 'ok';
  msg: string;
}

function Input(props: IInput){
  return (
    <div className="my-4">
      <p className="my-1">{props.label}</p>
      <input id={props.label.replace(/[ -]/g, '').toLowerCase()} type={props.type} placeholder={props.placeholder} className="p-2 px-4 bg-gray-700 border-2 border-gray-600"/>
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

function Email() {
  return (
    <Input type="email" label="E-mail" placeholder="example@email.com"/>
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

  function changeKind(_kind: popupKind){
    setServerReponse("");
    setKind(_kind);
  }

  async function signUp() {
    const data = {
      firstName: (document.querySelector("input#firstname") as HTMLInputElement).value,
      lastName: (document.querySelector("input#lastname") as HTMLInputElement).value,
      email: (document.querySelector("input#email") as HTMLInputElement).value,
      password: (document.querySelector("input#password") as HTMLInputElement).value,
      repeatPassword: (document.querySelector("input#repeatpassword") as HTMLInputElement).value,
    };

    let fetchReponseMessage: ReactNode = "";

    await fetch("http://localhost:3001/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => {console.log(response); return response.json()})
    .then(response => fetchReponseMessage = 
      <div className={styles.logs}>
        {response.logs?.map((log: Log, i: number) => (
          <p key={i} className={styles[`response-kind-${log.kind}`] + ' font-bold'}>
            {log.msg}
          </p>
        ))}
      </div>
    );

    setServerReponse(fetchReponseMessage);
  }

  async function logIn() {
    const data = {};
    let fetchReponseMessage: ReactNode = "";

    await fetch("http://localhost:3001/login",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => {console.log(response); return response.json()})
    .then(response => fetchReponseMessage = 
      <div className={styles.logs}>
        {response.logs?.map((log: Log, i: number) => (
          <p key={i} className={styles[`response-kind-${log.kind}`] + ' font-bold'}>
            {log.msg}
          </p>
        ))}
      </div>
    );

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
        <button onClick={() => { changeKind('log in'); }} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">here</button>
      </PopupContainer>
    )
  }
  else if (kind === 'log in') {
    return (
      <PopupContainer>
        <h1 className="text-lg font-extrabold italic">Log In</h1>
        <Email/>
        <Password/>
        {serverResponse}
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

