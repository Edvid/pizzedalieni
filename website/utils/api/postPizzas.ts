import { AddableItem } from "../basket/types";
import getBasketContentFromCookie from "../basket/getBasketContentFromCookie";
import getCookie from "../cookie/getCookie";

export default async function postPizzas() {
  const token = getCookie("token")
  if (typeof token === "undefined") return;
  const data: {basketContent: AddableItem[]} =
    {
      basketContent: getBasketContentFromCookie()
    }

  fetch(process.env.NEXT_PUBLIC_API_URL + "/userbasket/set",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify(data)
  })
}
