import { ReactNode } from "react";

interface IPageTitle {
    children: ReactNode;
}

function pageTitle(props: IPageTitle) {
  return (
    <div className="m-auto p-8">
      <h1 className='text-2xl text-center'>
        {props.children}
      </h1>
    </div>
  )
}

export default pageTitle;
