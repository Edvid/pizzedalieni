import React, { MouseEvent } from 'react'

import { InputDictionary } from '@/components/input';

import { CommonAPIResponse } from '.';

interface APIuserInfo {
  firstname?: string
}

export interface LoginAPIResponse extends CommonAPIResponse {
  userInfo?: APIuserInfo
  token?: string
}

async function logIn(inputs: InputDictionary): Promise<LoginAPIResponse> {
    var data: InputDictionary = {
      email: "",
      password: ""
    };

    for (const [k, v] of Object.entries(inputs)) {
      if (inputs[k]) data[k] = v;
    }

    return await fetch("http://localhost:3001/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => { return response.json() })
    .then(response => { return response as LoginAPIResponse })
    .catch((e) => {return {logs: [{msg: e.message, kind: 'error'}]} as LoginAPIResponse});
  }
 
export default function LoginSubmit(props: {data: InputDictionary, onSubmit: (response: LoginAPIResponse) => void}) {
  const handleSubmit = async (e: MouseEvent) => {
    if (props.onSubmit) {

      const response = await logIn(props.data);
      props.onSubmit(response);
    }
  };

  return (
    <button onClick={(e) => handleSubmit(e)} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">Log In</button>
  )
}

