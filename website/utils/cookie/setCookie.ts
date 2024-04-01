import { isClient } from "../isClient";
import getCookiePermission from "./getCookiePermission";

export default function setCookie (name: string, value: string): void {
  if (!isClient) {
    throw new Error('This function should only be called on the client.');
  }
  if (name === "cookie-permission" && value === "yes") {
    setCookieUnchecked(name, value);
    return;
  }
  if(getCookiePermission()) {
    setCookieUnchecked(name, value);
  }
}

function setCookieUnchecked(name: string, value: string){
  document.cookie = `${name}=${value}; path=/`;
}
