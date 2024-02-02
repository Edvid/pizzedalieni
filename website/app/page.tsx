import Image from 'next/image'
import NavBar from '@/components/navBar'
import PageTitle from '@/components/pageTitle'
import Container from '@/components/container' 
import { OpeningTimes } from '@/components/openingTimes'
import RateUs from '@/components/rateus'

export default function Home() {
  return (
    <main>
      <header>
        <NavBar/>
      </header>
      <div className='py-12'>
        <table className='m-auto max-w-[min(70rem,60%)]'>
          <tbody>
            <tr>
              <td>
                <PageTitle>Welcome to Pizze d'Alieni</PageTitle>
              </td>
              <td>
                <Image src='/favicon.ico' alt='Alien man' width={100} height={100}></Image>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Container>
        <OpeningTimes/>
        <RateUs/>
      </Container>
    </main>
  )
}
