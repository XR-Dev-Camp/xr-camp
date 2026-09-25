// Project filter
// --------------
// Progressive enhancement: the HTML shows every project, and the filter is
// hidden. This script shows the filter and makes it work. If the script
// fails to load, visitors still see every project: nothing is lost.
//
// The same ideas as the programme explorer in Course 1.6: find elements,
// listen for an event, decide what matches, and announce the result.

const filters = document.querySelector('#filters');
const count = document.querySelector('#project-count');
const cards = document.querySelectorAll('#project-list > li');

// Show only the cards whose data-skills include the chosen skill.
function showProjects() {
  const chosen = filters.querySelector('input:checked').value;
  let shown = 0;

  for (const card of cards) {
    const skills = card.dataset.skills.split(' ');
    const matches = chosen === 'all' || skills.includes(chosen);
    // hidden removes the card from the page and from screen readers.
    card.hidden = !matches;
    if (matches) shown += 1;
  }

  // #project-count has role="status", so this is announced.
  count.textContent = `Showing ${shown} of ${cards.length} projects.`;
}

// Only switch the filter on if the page has everything it needs.
if (filters && count && cards.length > 0) {
  filters.hidden = false;
  // One listener on the fieldset hears every radio button inside it.
  filters.addEventListener('change', showProjects);
  showProjects();
}
