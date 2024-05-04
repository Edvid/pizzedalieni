import React, { ReactNode, useEffect } from 'react'

type IPopUpContainer = {
  onClose: () => void,
  children: ReactNode
}

export default function PopUpContainer(props: IPopUpContainer) {

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (e.target) {
        let currentTestTarget: Element = e.target as Element;
        let foundmodal = false;
        while (!foundmodal && currentTestTarget.parentElement) {
          if (currentTestTarget.getAttribute('class')?.includes('modal-popup')) {
            foundmodal = true;
          } else {
            currentTestTarget = currentTestTarget.parentElement;
          }
        }
        if(!foundmodal) props.onClose();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    }
  })

  return (
    <div className="modal-popup fixed w-[24em] bg-gray-700 py-4 my-8 ml-[-12rem] px-[4rem]">
      {props.children}
    </div>
  )
}
