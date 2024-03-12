import React, { MouseEventHandler, ReactNode } from 'react'
import { userState } from '..'

function LogIn (props: { onClick: () => void }){
  return (
    <button type="button" onClick={props.onClick} className="rounded-lg px-4 py-2 m-[-8px] bg-teal-500 hover:bg-transparent border-2 border-teal-500">
      Log In
    </button>
  )
}

function SignUp (props: { onClick: () => void }){
  return (
    <button type="button" onClick={props.onClick} className="rounded-lg px-4 py-2 m-[-8px] bg-orange-500 hover:bg-transparent border-2 border-orange-500">
      Sign Up
    </button>
  )
}

function AvatarButton (props: { onClick: () => void }){
  return (
    <button type="button" onClick={props.onClick} className="rounded-lg px-4 py-2 m-[-8px] bg-blue-500 hover:bg-transparent border-2 border-blue-500">
      A
    </button>
  )
}

export default function Button(props: {onClick: () => void, userState: userState}) {
  const states: {[index in userState]: ReactNode} = {
    'log in': <LogIn onClick={props.onClick}/>,
    'sign up': <SignUp onClick={props.onClick}/>,
    'logged in': <AvatarButton onClick={props.onClick}/>
  }

  return (
    states[props.userState]
  )
}
