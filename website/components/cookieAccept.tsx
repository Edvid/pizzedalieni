'use client'
import getCookiePermission from "@/utils/cookie/getCookiePermission";
import setCookiePermission from "@/utils/cookie/setCookiePermission";
import { useState } from "react"

export default function CookieAccept () {
  const [ show, setShow ] = useState(!getCookiePermission());

  const acceptedCookie = () => {
    setCookiePermission();
    setShow(false);
  }

  if(show) {
    return (
      <div className="m-2 p-8 fixed z-20 bg-zinc-500 rounded-lg w-60">
        <p>
          henlo, pls accept cok
        </p>
        <button className="bg-green-500 my-2 p-4 rounded-lg" onClick={acceptedCookie}>
          Pls
        </button>
      </div>

    )
  }else {
    return(
      <></>
    )
  }
}
