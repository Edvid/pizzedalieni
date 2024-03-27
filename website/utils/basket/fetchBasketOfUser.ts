import getCookie from "../cookie/getCookie";
import setBasketCookie from "./setBasketCookie";
import { AddableItem } from "./types";

export default async function fetchBasketOfUser(): Promise<AddableItem[]> {
  const token: string | undefined = getCookie("token");
  if(typeof token !== "undefined") {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/userbasket/get",{
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
    })
      .then(response => response.json() )
      .then(response => { setBasketCookie(response); return response as AddableItem[] })
  }
  else {
    throw `token was ${typeof token}`;
  }
  }
