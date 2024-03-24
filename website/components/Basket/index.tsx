import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
import { AddableItem, IBasket, IBasketItem } from './basketTypes';

function BasketItem (props: IBasketItem) {
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

function BasketTotal (props: {totalPrice: string}) {
  return (
    <div className='grid m-2 grid-cols-[7rem,1fr,5rem]'>
      <div className='mx-2'>
        <button
          className={ "bg-green-400 rounded-lg w-full pointer hover:bg-green-300 " + styles["material-symbols-outlined"] }
          onClick={() => 0}
        >
          shopping_cart_checkout
        </button>
      </div>
      <p></p>
      <p className='text-orange-500'>{props.totalPrice} Ƶ </p>
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
              <BasketItem 
                key={i} 
                itemId={item.itemId}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAmountChange={(amount) => updateContent(i, amount)}/>
            ))
          }
        </>
        <div className='bg-zinc-300 h-[1px] my-4 mx-2'></div>
        <BasketTotal totalPrice={
         props.added
          .map<Number>((item) => Number(item.price.slice(1)) * item.amount)
          .reduce<string>((prev, next) => (Number(prev) + Number(next)).toFixed(2), "0")
        }/>
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

