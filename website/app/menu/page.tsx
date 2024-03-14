'use client'
import { useEffect, useState } from 'react';

import NavBar from '@/components/navBar'
import PageTitle from '@/components/pageTitle'
import AddIcon from '@/components/addIcon';
import Image from 'next/image';
import { base64, ensureBase64 } from '@/utils/base64';

interface Pizza {
  id: number;
  name: string;
  ingredients: string[];
  image?: base64;
}

function PizzaRow (props: Pizza) {
  return (
    <div key={props.id} className='w-[60rem] mx-auto p-8 my-8 bg-zinc-600 rounded-lg'>
      <div className='grid grid-cols-[6fr,1fr,3em]'>
        <div>
          <table>
            <tbody>
              <tr>
                <td className='pr-8'>
                  {props.id}.
                </td>
                <td key={props.id}>
                  {props.name}
                </td>
              </tr>
            </tbody>
          </table>
          <p className='text-zinc-400 italic first-letter:capitalize'>
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
          <AddIcon/>
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchPizzas() {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/pizzas")
        .then(response => response.json())
        .then(data => setPizzas(data));
    }

    fetchPizzas();

    return () => { setPizzas([]) };
  }, [])

  return (
    <main>
      <header>
        <NavBar/>
      </header>
      <PageTitle>Menu</PageTitle>
      {(pizzas).map(pizza => (
        <PizzaRow
          key={pizza.id}
          id={pizza.id}
          name={pizza.name}
          ingredients={pizza.ingredients}
          image={pizza.image}/>
      ))}
    </main>
  )
}
