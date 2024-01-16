import Image from 'next/image'
import Avatar from '@/components/avatar'
import { MenuItems } from '@/components/menuItems';

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
    <div className='bg-gradient-to-t from-purple-900 from-5% to-transparent to-20%'>
      <div className='p-8 w-[60%] grid grid-cols-2 mx-auto'>
        <Logo/>
        <div className='flex justify-end space-x-20'>
          <MenuItems/>
          <Avatar/>
        </div>
      </div>
    </div>
  )
}

export default NavBar;
