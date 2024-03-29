'use client'
import getCookiePermission from "@/utils/cookie/getCookiePermission";
import setCookiePermission from "@/utils/cookie/setCookiePermission";
import DetailedDescription from "@/components/detailedDescription";
import { useState } from "react"

export default function CookieAccept () {
  const [ show, setShow ] = useState(!getCookiePermission());

  const acceptedCookie = () => {
    setCookiePermission();
    setShow(false);
  }
  
  const technicalCookieReasons = [
    "BasketContent - stores what you have in your basket as a cookie so it won't be forgotten when you reload the site",
    "token - An encrypted cookie containing info about which user is logged in which only my server knows how to read. Essential for staying logged in as you navigate the site or authorizing any user specific behaviour on the site",
    "cookie-permission - A cookie that can only ever be set to \"yes\". Only used for knowing if or if you haven't accepted these cookies being used. No deny option, you can only ignore. Remembering your choice to deny would mean storing a cookie. Can't have that. The cookie permission box will have to follow you around everywhere as you use the site."
  ];

  if(show) {
    return (
      <div className="m-2 p-8 fixed bg-zinc-500 rounded-lg w-[40rem]">
        <p>
          Hello! This website is a portfolio project for me to land a job. The site uses a few cookies for essential functionality. None of them are tracking cookies. If you do not accept, we won't go behind your back and make use of the necessary cookies anyway. We will respect your wish to not store or read cookies on your browser and our site will loose functionality.
        </p>
        <DetailedDescription title="Technical Description">
          <p>
            There's only {technicalCookieReasons.length} cookies:
          </p>
          <ul>
          {technicalCookieReasons.map((text: string, i: number) => (
            <li key={i} className="pt-3">{text}</li>
          ))}
          </ul>
        </DetailedDescription>
        <button className="bg-green-500 my-2 p-4 rounded-lg" onClick={acceptedCookie}>
          Accept Necessary
        </button>
      </div>

    )
  }else {
    return(
      <></>
    )
  }
}
