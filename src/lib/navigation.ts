export function routeIsActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  const current = pathname.replace(/\/+$/, "") || "/";
  const target = href.replace(/\/+$/, "") || "/";
  return current === target || (target !== "/" && current.startsWith(`${target}/`));
}
