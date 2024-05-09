"use client"
import NavBar from '@/components/navBar'
import styles from './styles.module.css';
import setCookie from '@/utils/cookie/setCookie';
import getCookie from '@/utils/cookie/getCookie';
import deleteCookie from '@/utils/cookie/deleteCookie';
import postPizzas from '@/utils/api/postPizzas';

export default function Checkout () {

  const currentBasket = getCookie("current-basket");

  if(typeof currentBasket !== 'undefined' && currentBasket !== '[]'){
    deleteCookie("current-basket");
    postPizzas();
    setCookie("bought-basket", currentBasket ?? "[]");
  }

  return (
    <main>
      <header>
        <NavBar/>
      </header>
      <div className={ styles['message'] + ' text-center' }>
        <p>
          Thank you for ordering pizza from Pizze D'alieni!
        </p>
        <p>
          Your order is
        </p>
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
              JSON.parse(getCookie("bought-basket") ?? "[]")
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
        <p>
          Your order will arrive in approxiately 4000 earth years, give or take
          2 lunar cycles. You pay when we arrive. Be sure to be ready to answer
          our call within an hour of when we arrive. We will arrive at
          3.1415° S, 29.9792° E.
        </p>
        <p>
          Our Zorgons do not exchange to USD nor any other currency used on a
          national level on planet Earth. They do however exchange to minutes
          of undevided attention to our Blargorb dance. Performing this dance
          to other intelligent life across the universe means a lot to our
          species, so that's what we run our business on.
        </p>
      </div>
    </main>
  )
}
