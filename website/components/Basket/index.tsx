import React, { ReactNode } from 'react';
import { AddableItem, IBasket } from './basketTypes';
import BasketItem from './basketItem';
import BasketTotal from './basketTotal';

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

