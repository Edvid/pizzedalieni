import React from 'react';
import styles from './styles.module.scss';
import { IBasketItem } from './basketTypes';

export default function BasketItem (props: IBasketItem) {
  const buttonStyle = "bg-zinc-200 rounded-lg mx-2 pointer hover:bg-zinc-400 ";
  return (
    <div className='grid m-2 grid-cols-[7rem,5fr]'>
      <div className='grid grid-cols-[3fr,1fr,3fr]'>
        <button
          className={buttonStyle + styles["material-symbols-outlined"]}
          onClick={() => props.onAmountChange(-1)}
        >
          remove
        </button>
        <h3 className='text-center'>{props.amount}</h3>
        <button
          className={buttonStyle + styles["material-symbols-outlined"]}
          onClick={() => props.onAmountChange(1)}
        >
          add
        </button>
      </div>
      <div className='grid grid-cols-[2rem,1fr,5rem]'>
        <h3>{props.itemId}. </h3>
        <h3>{props.name ? props.name : "Item number " + props.itemId}</h3>
        <h3 className='text-orange-500'>{props.price.slice(1)} Ƶ</h3>
      </div>
    </div>
  )
}
