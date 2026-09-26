// cookies.js: a small hand-written cookie parser, pulled out into its own
// file (Courses 5.1-5.3 kept it inline in server.js) because this lesson
// needs it in two places that do not otherwise share code: server.js's
// ordinary HTTP routes, and wsAuth.js's WebSocket upgrade check.
//
// "name=value; name2=value2" becomes { name: 'value', name2: 'value2' }.
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
