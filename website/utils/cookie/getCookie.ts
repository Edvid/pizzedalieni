import { isClient } from "../isClient";
import getCookiePermission from "./getCookiePermission";

function getFromSemicolonSeperatedString (searchString: string, SemicolonSeperatedString: string): string {
  return SemicolonSeperatedString
    .split(/; ?/)
    .filter((semStr) => semStr !== "")
    .filter((semStr) => semStr.startsWith(searchString + "="))
    .map((semStr) => semStr.substring(searchString.length + 1, semStr.length))[0];
}

export default function getCookie (str: string): string | undefined {
  if (!isClient) {
    throw new Error('This function should only be called on the client.');
  }
  if (getCookiePermission()) {
    return getCookieUnchecked(str);
  }
  return undefined;
}

function getCookieUnchecked(str: string): string | undefined {
  return getFromSemicolonSeperatedString(str, document.cookie);
}

export const exportedForTesting = {
  getFromSemicolonSeperatedString
}
