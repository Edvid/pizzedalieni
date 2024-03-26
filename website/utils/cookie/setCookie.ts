import getCookiePermission from "./getCookiePermission";

export default function setCookie (name: string, value: string): void {
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
