import Image from 'next/image'
import HeaderItem from '@/components/headerItem'
import { ReactNode } from 'react';

function Logo() {
  return (
      <div>
        <Image alt="company logo" src="/logo.png" width={80} height={60}></Image>
      </div>
  )
}

interface ImenuItem {
  name: string;
  path?: string;
}
const menuItem: ImenuItem[] = [
  { name: 'Menu', path: '/menu/' },
  { name: 'Info', path: '/' },
  { name: 'Log in' },
];

function MenuItems() {
  const all: ReactNode[] = menuItem.map((e, i) => { 
    if(e.path) {
      return (
        <div key={i}>
          <a href={e.path}>
            <HeaderItem>{e.name}</HeaderItem>
          </a>
        </div>
      )
    }
    return (
      <div key={i}>
        <HeaderItem>{e.name}</HeaderItem>
      </div>
    )
  });

  return (
    <div className='flex justify-end space-x-20'>
      {all}
    </div>
  )
}

function NavBar() {
  return (
    <div className='bg-gradient-to-t from-purple-900 from-5% to-transparent to-20%'>
      <div className='p-8 w-[60%] grid grid-cols-2 mx-auto'>
        <Logo/>
        <MenuItems/>
      </div>
    </div>
  )
}

export default NavBar;
