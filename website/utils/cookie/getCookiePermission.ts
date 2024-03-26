export default function getCookiePermission(): boolean {
  return document.cookie.includes("cookie-permission=yes");
}
