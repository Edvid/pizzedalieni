import React, { ReactNode, useState } from 'react'
import styles from './styles.module.scss';

interface IDetailedDescription {
  title: string; 
  children: ReactNode
}

function InfoIcon () {
  return (
    <div className='h-[10px] bg-blue-400 rounded-xl'>
      <p className={styles["material-symbols-outlined"] + " " + styles["info"]}>info</p>
    </div>
  )
}

export default function DetailedDescription(props: IDetailedDescription) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <div className="pt-4">
      <button className='inline-flex' onClick={handleClick}>
        <p className='underline decoration-dashed underline-offset-4 cursor-pointer'>{props.title}</p>
        <InfoIcon/>
        <p className={styles["material-symbols-outlined"]}>arrow_drop_{show ? "up" : "down"}</p>
      </button>
      <div className='my-4 ml-6 overflow-scroll max-h-[calc(100vh-35em)]'>
        {show ? props.children : ""}
      </div>
    </div>
  )
}
