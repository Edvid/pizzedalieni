import NavBar from '@/components/navBar'
import styles from './styles.module.css';
import BoughtTable from '@/components/boughtTable';

export default function Checkout () {

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
        <BoughtTable/>
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
