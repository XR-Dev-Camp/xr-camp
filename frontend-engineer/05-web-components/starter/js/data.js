// data.js: loading the course data (the same file as Course 2.2).

export async function loadCatalog(url = 'data/catalog.json') {
  const response = await fetch(url);
  // fetch only fails on network errors; a missing file is a 404 "success".
  if (!response.ok) {
    throw new Error(`Could not load the course data (${response.status}).`);
  }
  return response.json();
}
