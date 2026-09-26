// catalog.js: loading the course data (Course 2.1's data.js).

import { CATALOG_URL } from '../config.js';

export async function loadCatalog(url = CATALOG_URL) {
  const response = await fetch(url);
  // fetch only fails on network errors; a missing file is a 404 "success".
  if (!response.ok) throw new Error(`catalog ${response.status}`);
  return response.json();
}
