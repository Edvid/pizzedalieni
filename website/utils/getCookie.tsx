export default function getCookie (str: string, cookie?: string): string | undefined {
  return (cookie ? cookie : document.cookie)
    .split(/; ?/)
    .filter((s) => s !== "")
    .filter((s) => s.startsWith(str + "="))
    .map((s) => s.substring(str.length + 1, s.length))[0];
}
