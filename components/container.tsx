import { ReactNode } from "react";

interface IContainer {
    children: ReactNode;
}

function container(props: IContainer) {
  return (
    <section>
      <div className="w-[60rem] rounded-3xl m-auto p-8 bg-zinc-800 ">
        <h1 className='text-2xl text-center'>
          {props.children}
        </h1>
      </div>
    </section>
  )
}

export default container;
