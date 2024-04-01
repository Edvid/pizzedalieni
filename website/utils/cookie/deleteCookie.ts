import { isClient } from "../isClient";

export default function deleteCookie (name: string): void {
  if (!isClient) {
    throw new Error('This function should only be called on the client.');
  }
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
