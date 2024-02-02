import HeaderItem from '@/components/headerItem';
import { ReactNode } from 'react';
import { menuItem, ImenuItem } from '@/components/navBar';

export function MenuItems() {
  const all: ReactNode[] = menuItem.map((e: ImenuItem, i: number) => {
    if (e.path) {
      return (
        <div key={i}>
          <a href={e.path}>
            <HeaderItem>{e.name}</HeaderItem>
          </a>
        </div>
      );
    }
    return (
      <div key={i}>
        <HeaderItem>{e.name}</HeaderItem>
      </div>
    );
  });

  return (
    <div className='flex justify-end space-x-20'>
      {all}
    </div>
  );
}

