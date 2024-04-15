import deleteCookie from "../cookie/deleteCookie";
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
      .then(response => {
        if(typeof response.pizzas === "undefined") {
          if (response.error === "token expired") {
            throw new Error("token expired");
          } else{
            throw new Error("pizza property not found in response");
          }
        } else {
          return response.pizzas
        }
      })
      .then(pizzas => { setBasketCookie(pizzas); return pizzas })
      .catch(error => {
        if (error.message === "token expired") {
          deleteCookie("token");
          return []
      }})
  }
  else {
    throw `token was ${typeof token}`;
  }
  }
