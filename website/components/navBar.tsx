import Image from 'next/image'
import Avatar from '@/components/avatar'
import { MenuItems } from '@/components/menuItems';
import CookieAccept from '@/components/cookieAccept';

function Logo() {
  return (
    <div>
      <Image alt="company logo" src="/logo.png" width={80} height={60}></Image>
    </div>
  )
}

export interface ImenuItem {
  name: string;
  path?: string;
  onclick?: Function;
}

export const menuItem: ImenuItem[] = [
  { name: 'Menu', path: '/menu/' },
  { name: 'Info', path: '/' },
];

function NavBar() {
  return (
    <>
      <div className='fixed w-[100vw] bg-gradient-to-t from-purple-900 from-5% to-black to-20% z-50'>
        <div className='p-8 w-[60%] grid grid-cols-2 mx-auto'>
          <Logo/>
          <div className='flex justify-end space-x-20'>
            <MenuItems/>
            <Avatar/>
          </div>
        </div>
      </div>
      <div className='p-8 h-[6rem]'>
      </div>
      <CookieAccept/>
    </>
  )
}

export default NavBar;
