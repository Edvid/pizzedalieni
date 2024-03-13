import React, { MouseEvent } from 'react'

import { InputDictionary } from '@/components/input';

import { CommonAPIResponse } from '.';

export interface LogoutAPIResponse extends CommonAPIResponse { }

async function logOut(token: string): Promise<LogoutAPIResponse> {
    var data: InputDictionary = {
      token: token,
    };
    return await fetch("http://localhost:3001/logout",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => { return response.json() })
    .then(response => { return response as LogoutAPIResponse })
    .catch((e) => {return {logs: [{msg: e.message, kind: 'error'}]} as LogoutAPIResponse});
  }

export default function LogoutSubmit(props: {token?: string, onSubmit: (response: LogoutAPIResponse) => void}) {
  const handleSubmit = async (e: MouseEvent) => {
    if (props.onSubmit) {
      if(props.token){
        const response = await logOut(props.token);
        props.onSubmit(response);
      }else{
        props.onSubmit({logs: [{msg: "Token cookie was not found when preparing API call", kind: "error"}]});
      }

    }
  };

  return (
    <button onClick={(e) => handleSubmit(e)} className="rounded-lg px-2 py-1 mt-2 bg-blue-500 hover:bg-transparent border-2 border-blue-500">Log Out</button>
  )
}
