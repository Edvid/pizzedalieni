"use client"
import React, { useEffect, useState } from 'react'

import setCookie from '@/utils/cookie/setCookie';
import getCookie from '@/utils/cookie/getCookie';
import deleteCookie from '@/utils/cookie/deleteCookie';
import postPizzas from '@/utils/api/postPizzas';

export default function BoughtTable () {
  const [boughtBasket, setBoughtBasket] = useState<string>("[]");

  useEffect(() => {
    const currentBasket = getCookie("current-basket");

    if(typeof currentBasket !== 'undefined' && currentBasket !== '[]'){
      deleteCookie("current-basket");
      postPizzas();
      setCookie("bought-basket", currentBasket ?? "[]");
    }

    setBoughtBasket(getCookie("bought-basket") ?? "[]");
  }, [])

  return (
    <table className='m-auto rounded-lg'>
      <tbody>
        <tr>
          <th className="p-4 border-2 border-transparent border-b-white">
            Pizza number
          </th>
          <th className="p-4 border-2 border-transparent border-b-white">
            Name
          </th>
          <th className="p-4 border-2 border-transparent border-b-white">
            Amount
          </th>
          <th className="p-4 border-2 border-transparent border-b-white">
            Price
          </th>
        </tr>
        {
          JSON.parse(boughtBasket)
          .map((
            element: {
              itemId: number,
              name: string,
              price: string,
              amount: string
            },
            i: number
          ) => (
              <tr key={i}>
                <td className='p-4'>
                  {element.itemId}
                </td>
                <td className="p-4">
                  {element.name}
                </td>
                <td className="p-4">
                  {element.amount}
                </td>
                <td className="p-4">
                  {element.price.slice(1)}Ƶ x {element.amount}
                  <br/>
                  {(Number(element.price.slice(1)) * Number(element.amount)).toFixed(2)}Ƶ
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  )
}

