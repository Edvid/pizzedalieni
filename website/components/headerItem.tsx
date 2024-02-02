import { ReactNode } from "react";
import { Nunito_Sans } from 'next/font/google'

const TitleFont = Nunito_Sans({weight: '900',  subsets: ['latin'] })

interface IHeaderItem {
  children: ReactNode;
}

function headerItem(props: IHeaderItem) {
  return (
    <h1 className={TitleFont.className + " text-2xl"}>
      {props.children}
    </h1>
  )
}

export default headerItem
