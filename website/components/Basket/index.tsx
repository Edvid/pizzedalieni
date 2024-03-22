import React, { useState } from 'react';
import styles from './styles.module.scss';

interface AddableItem {
  itemId: number;
  name?: string;
  amount: number;
}

interface Extra extends AddableItem { }

interface BasketAddable extends AddableItem {
  extras?: Extra[];
  notes?: string;
}

interface Content {
  added: AddableItem[]
}

interface IBasketItem extends AddableItem {
  onAmountChange: (itemId: number, amountChange: number) => void;
}

function BasketItem (props: IBasketItem) {
  const buttonStyle = "bg-zinc-200 rounded-lg mx-2 w-8 pointer hover:bg-zinc-400 ";
  return (
    <div className='grid grid-cols-2'>
      <div className='flex'>
        <button
          className={buttonStyle + styles["material-symbols-outlined"]}
          onClick={() => props.onAmountChange(props.itemId, -1)}
        >
          remove
        </button>
        <h3>{props.amount}</h3>
        <button
          className={buttonStyle + styles["material-symbols-outlined"]}
          onClick={() => props.onAmountChange(props.itemId, 1)}
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

function BasketContent() {
  const [content, setContent] = useState<Content>({added: [{itemId: 123, name: "testPizza", amount: 1}]});

  const updateContent = (itemId: number, amountChange: number) => {
    setContent( {
      added:
      content.added.map( (item: AddableItem) =>
      {
        if (item.itemId === itemId) {
          item.amount += amountChange;
        }
        return item;
      }).filter((item) => item.amount > 0)
    });
  }

  if (content.added.length > 0) {
    return (
      <>
        {
          content.added.map((item, i) => (
            <BasketItem key={i} itemId={item.itemId} name={item.name} amount={item.amount} onAmountChange={updateContent}/>
          ))
        }
      </>
    );
  } else {
    return (
      <h3 className='text-center text-xl p-4 italic decoration-dotted'>Your basket is currently empty</h3>
    )
  }
}

export default function Basket () {
  return (
    <div className='sticky top-6'>
      <div className='rounded-lg bg-gray-800 m-8'>
        <h2 className='text-2xl text-center p-4'>
          Basket
        </h2>
        <BasketContent/>
      </div>
    </div>
  )
}
