'use client'
import { useEffect, useState } from 'react';

import NavBar from '@/components/navBar'
import PageTitle from '@/components/pageTitle'
import AddIcon from '@/components/addIcon';

interface Pizza {
  id: number;
  name: string;
  ingredients: string[];
  image?: any;
}

function PizzaRow (props: Pizza) {
  return (
    <div key={props.id} className='w-[60rem] mx-auto p-8 my-8 bg-zinc-600 rounded-lg'>
      <div className='grid grid-cols-[1fr,3em]'>
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
        <div className='table m-auto '>
          <AddIcon/>
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);

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
      {(pizzas as Pizza[]).map(pizza => (
        <PizzaRow key={pizza.id} id={pizza.id} name={pizza.name} ingredients={pizza.ingredients}/>
      ))}
    </main>
  )
}
