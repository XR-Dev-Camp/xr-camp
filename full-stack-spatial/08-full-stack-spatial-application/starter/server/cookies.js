// cookies.js: carried over unchanged from Courses 5.2-5.4. A small
// hand-written cookie parser: "name=value; name2=value2" becomes
// { name: 'value', name2: 'value2' }.
export function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  for (const pair of header.split(';')) {
    const index = pair.indexOf('=');
    if (index === -1) continue;
    cookies[pair.slice(0, index).trim()] = decodeURIComponent(pair.slice(index + 1).trim());
  }
  return cookies;
}
