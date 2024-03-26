export default function setCookie (name: string, value: string, path?: string): void {
  const Path = path ? path : "/";
  document.cookie = `${name}=${value}; path=${Path}`;
}
