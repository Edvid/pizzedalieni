import React, { MouseEvent } from 'react'

import { InputDictionary } from '@/components/input';

import { Log } from './serverresponserenderer';

async function logIn(inputs: InputDictionary): Promise<Log[]> {
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
    .then(response => { console.log(response); return response.logs as Log[] })
    .catch((e) => [{msg: e.message, kind: 'error'}] as Log[]);
  }
 
export default function LoginSubmit(props: {data: InputDictionary, onSubmit: Function}) {
  const handleSubmit = async (e: MouseEvent) => {
    if (props.onSubmit) {

      console.log(props.data);
      const responses = await logIn(props.data);
      props.onSubmit(responses);
    }
  };

  return (
    <button onClick={(e) => handleSubmit(e)} className="rounded-lg px-2 py-1 mt-2 bg-teal-500 hover:bg-transparent border-2 border-teal-500">Log In</button>
  )
}

