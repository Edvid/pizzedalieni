import setCookie from "../cookie/setCookie";
import { AddableItem } from "./types";

export default function setBasketCookie(content:AddableItem[]) {
  setCookie("current-basket", JSON.stringify(content))
}
