'use client'
import { useEffect, useRef, useState } from 'react';

import NavBar from '@/components/navBar'
import PageTitle from '@/components/pageTitle'
import AddIcon from '@/components/addIcon';
import Image from 'next/image';
import { Pizza, AddableItem } from '@/utils/basket/types';
import { ensureBase64 } from '@/utils/base64';
import Basket from '@/components/Basket';
import getCookie from '@/utils/cookie/getCookie';
import fetchBasketOfUser from '@/utils/basket/fetchBasketOfUser';
import setBasketCookie from '@/utils/basket/setBasketCookie';
import getBasketContentFromCookie from '@/utils/basket/getBasketContentFromCookie';

function PizzaRow (props: Pizza) {
  return (
   <div key={props.id} className='w-full mx-auto p-8 my-8 bg-zinc-600 rounded-lg'>
      <div className='grid grid-cols-[6fr,1fr,3em]'>
        <div className='grid grid-cols-2 grid-rows-2'>
          <div>
            <span className='grid grid-cols-[3rem,1fr]'>
              <p>
                {props.id}.
              </p>
              <p>
                {props.name}
              </p>
            </span>
          </div>
          <p className='text-orange-400 text-right mx-6 text-xl'>{props.price.slice(1)} Zorgons</p>
          <p className='col-span-2 text-zinc-400 italic first-letter:capitalize'>
            {props.ingredients.map((item, i) => (item + (i == props.ingredients.length - 1 ? "": ", ")))}
          </p>
        </div>
        <div>
          <Image
          src={props.image && ensureBase64(props.image) ? `data:image/png;base64,${props.image}` : "data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbi1iYW5nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDggOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cmVjdCB4PSIyLjk4OSIgd2lkdGg9IjIuMDIzIiBoZWlnaHQ9IjUuNDcxIi8+DQo8cmVjdCB4PSIyLjk4OSIgeT0iNi4zOSIgd2lkdGg9IjIuMDIzIiBoZWlnaHQ9IjEuNjEiLz4NCjwvc3ZnPg=="}
          alt="pizza image"
          height={60}
          width={80}/>
        </div>
        <div className='table m-auto '>
          <AddIcon onClick={() => props.onAdd()}/>
        </div>
      </div>
    </div>
  )
}


export default function Menu() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [ basketContent, setBasketContent ] = useState<AddableItem[]>([]);

  let postPizzasTimer = useRef<number>(0);
  let havePostedPizzas = useRef<boolean>(false);
  let postPizzaIntervalFunc = useRef<NodeJS.Timeout>();
  let StillFetchingBasket = useRef<boolean>(true);

  useEffect(() => {
    async function fetchPizzas() {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/pizzas")
        .then(response => response.json())
        .then(data => setPizzas(data));
    }

    fetchPizzas();
    fetchBasketOfUser()
      .then(returnedContent => setBasketContent(returnedContent))
      .catch((e) => {if (e === "token was undefined") { setBasketContent(getBasketContentFromCookie()) }})
      .finally(() => StillFetchingBasket.current = false);

    return () => { 
      setPizzas([])
      setBasketContent([]);
    };
  }, [])

  useEffect(() => {

    async function postPizzas(token?: string) {
      if (typeof token === "undefined") return;
      const data: {basketContent: AddableItem[]} =
        {
          basketContent: getBasketContentFromCookie()
        }

      fetch(process.env.NEXT_PUBLIC_API_URL + "/userbasket/set",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(data)
      })
    }

    function updateBasketCookie(){
      setBasketCookie(basketContent);

      postPizzasTimer.current = 0;
      havePostedPizzas.current = false;

      if(postPizzaIntervalFunc.current === undefined){
        postPizzaIntervalFunc.current = setInterval(() => {
          if (postPizzasTimer.current >= 1500 && !havePostedPizzas.current) {
            postPizzas(getCookie("token"));
            havePostedPizzas.current = true;
          }
          postPizzasTimer.current += 100;
        }, 100)}
    }

    if (!StillFetchingBasket.current) {
      updateBasketCookie();
    }

    return () => {
      postPizzasTimer.current = 0;
      havePostedPizzas.current = false;
      postPizzaIntervalFunc.current = undefined
    }

  }, [basketContent])

  const addPizza = (pizza: Pizza) => {
    let bc: AddableItem[] = basketContent.slice();
    bc.push({itemId: pizza.id, name: pizza.name, price: pizza.price, amount: 1});
    setBasketContent(bc);
  }

  return (
    <main>
      <header>
        <NavBar/>
      </header>
      <PageTitle>Menu</PageTitle>
      <div className='grid grid-cols-[65%,35%] w-[85rem] m-auto'>
        <section>
          {(pizzas).map(pizza => (
            <PizzaRow
              key={pizza.id}
              id={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              image={pizza.image}
              onAdd={() => addPizza(pizza)} />
          ))}
        </section>
        <section className='relative'>
          <Basket added={basketContent} onContentUpdated={setBasketContent}/>
        </section>
      </div>
    </main>
  )
}
