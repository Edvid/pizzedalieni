function getFromSemicolonSeperatedString (searchString: string, SemicolonSeperatedString: string): string {
  return SemicolonSeperatedString
    .split(/; ?/)
    .filter((semStr) => semStr !== "")
    .filter((semStr) => semStr.startsWith(searchString + "="))
    .map((semStr) => semStr.substring(searchString.length + 1, semStr.length))[0];
}

export default function getCookie (str: string): string | undefined {
  return getFromSemicolonSeperatedString(str, document.cookie);
}

export const exportedForTesting = {
  getFromSemicolonSeperatedString
}
