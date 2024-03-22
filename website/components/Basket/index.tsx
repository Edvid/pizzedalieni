import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
import { AddableItem, IBasket, IBasketItem } from './basketTypes';

function BasketItem (props: IBasketItem) {
  const buttonStyle = "bg-zinc-200 rounded-lg mx-2 w-8 pointer hover:bg-zinc-400 ";
  return (
    <div className='grid grid-cols-2'>
      <div className='flex'>
        <button
          className={buttonStyle + styles["material-symbols-outlined"]}
          onClick={() => props.onAmountChange(-1)}
        >
          remove
        </button>
        <h3>{props.amount}</h3>
        <button
          className={buttonStyle + styles["material-symbols-outlined"]}
          onClick={() => props.onAmountChange(1)}
        >
          add
        </button>
      </div>
      <div className='grid grid-cols-[1fr,4fr]'>
        <h3>{props.itemId}. </h3>
        <h3>{props.name ? props.name : "Item number " + props.itemId}</h3>
      </div>
    </div>
  )
}

function BasketContainer (props: {children: ReactNode}) {
  return (
    <div className='sticky top-6'>
      <div className='rounded-lg bg-gray-800 m-8'>
        <h2 className='text-2xl text-center p-4'>
          Basket
        </h2>
        {props.children}
      </div>
    </div>
  )
}
export default function Basket (props: IBasket) {
  const updateContent = (index: number, amountChange: number) => {
    let newContent: AddableItem[] = props.added.map( (item: AddableItem, i: number) =>
      {
        if (i === index) {
          item.amount += amountChange;
        }
        return item;
      }).filter((item) => item.amount > 0);

    props.onContentUpdated(newContent);
  }



  if (props.added.length > 0) {
    return (
      <BasketContainer>
        <>
          {
            props.added.map((item, i) => (
              <BasketItem key={i} itemId={item.itemId} name={item.name} amount={item.amount} onAmountChange={(amount) => updateContent(i, amount)}/>
            ))
          }
        </>
      </BasketContainer>
    );
  } else {
    return (
      <BasketContainer>
        <h3 className='text-center text-xl p-4 italic decoration-dotted'>Your basket is currently empty</h3>
      </BasketContainer>
    )
  }
}

