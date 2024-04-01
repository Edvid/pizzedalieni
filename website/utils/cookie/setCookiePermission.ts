import { isClient } from "../isClient";

export default function setCookiePermission() {
  if (!isClient) {
    throw new Error('This function should only be called on the client.');
  }
  document.cookie = "cookie-permission=yes; path=/";
}

