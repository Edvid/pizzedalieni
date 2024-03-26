import getCookie from "../getCookie";
import { AddableItem } from "./types";

export default function getBasketContentFromCookie(): AddableItem[] {
  const basketCookie = getCookie("current-basket");
  if (typeof basketCookie === "undefined") return [];
  const basket = JSON.parse(basketCookie);
  return basket;
}
