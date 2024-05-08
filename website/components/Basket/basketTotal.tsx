import React from 'react';
import styles from './styles.module.scss';

export default function BasketTotal (props: {totalPrice: string}) {
  return (
    <div className='grid m-2 grid-cols-[7rem,1fr,5rem]'>
      <div className='mx-2'>
        <a
          className="block bg-green-400 rounded-lg w-full pointer hover:bg-green-300"
          href="/checkout"
        >
          <span className={"block m-auto " + styles["material-symbols-outlined"]}>
            shopping_cart_checkout
          </span>
        </a>
      </div>
      <p className='ml-8 font-black'>Total</p>
      <p className='text-orange-500'>{props.totalPrice} Ƶ </p>
    </div>
  )
}
