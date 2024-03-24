import React, { ReactNode } from 'react'
import styles from './styles.module.css';

export default function PopUpContainer(props: {children: ReactNode}) {
  return (
    <div className={ "fixed w-[24em] bg-gray-700 py-4 my-8 ml-[-12rem] px-[4rem] " + styles["popup-container"] }>
      {props.children}
    </div>
  )
}
