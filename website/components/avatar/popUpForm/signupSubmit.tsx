import React, { MouseEvent } from 'react'

import { InputDictionary } from '@/components/input';

import { CommonAPIResponse } from '.';

export interface SignupAPIResponse extends CommonAPIResponse {}

async function signUp(inputs: InputDictionary): Promise<SignupAPIResponse> {
    var data: InputDictionary = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeatpassword: ""
    };

    for (const [k, v] of Object.entries(inputs)) {
      if (inputs[k]) data[k] = v;
    }

    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/signup",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => { return response.json() })
    .then(response => { return response as SignupAPIResponse })
    .catch((e) => {return {logs: [{msg: e.message, kind: 'error'}]} as SignupAPIResponse});
  }

export default function signupSubmit(props: {data: InputDictionary, onSubmit: (response: SignupAPIResponse) => void}) {
  const handleSubmit = async (e: MouseEvent) => {
    if (props.onSubmit) {
      const response = await signUp(props.data);
      props.onSubmit(response);
    }
  };

  return (
    <button onClick={(e) => handleSubmit(e)} className="rounded-lg px-2 py-1 mt-2 bg-orange-500 hover:bg-transparent border-2 border-orange-500">Sign Up</button>
  )
}

