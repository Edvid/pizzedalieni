import React from 'react';

type inputType = 'text' | 'email' | 'password';

interface IDictionary<TValue> {
  [id: string]: TValue;
}

const defaultPlaceholders: IDictionary<string> = {
  password: "••••••••",
  repeatpassword: "••••••••",
  email: "example@email.com",
  firstname: "Jenny",
  lastname: "Padding"
}


interface IInput {
  label: string;
  onChange?: Function;
  type?: inputType;
  placeholder?: string;
}

export default function Input(props: IInput){
  const inputName: string = props.label.replace(/[ -]/g, '').toLowerCase();
  const type: inputType = props.type ?
    props.type :
    ( inputName as inputType ? inputName as inputType : 'text');
  const placeholder: string = props.placeholder ?
    props.placeholder :
    defaultPlaceholders[inputName];

  const handleChange = e => {
    if (props.onChange) {
      props.onChange({[e.target.id]: e.target.value});
    }
  };

  return (
    <div className="my-4">
      <p className="my-1">{props.label}</p>
      <input id={inputName} type={type} placeholder={placeholder} className="w-full p-2 px-4 bg-gray-700 border-2 border-gray-600" onChange={handleChange}/>
    </div>
  )
}
