import { isClient } from "../isClient";

export default function getCookiePermission(): boolean {
  if (!isClient) {
    throw new Error('This function should only be called on the client.');
  }
  return document.cookie.includes("cookie-permission=yes");
}
