// The language menu is a plain <details>, so it works without JavaScript.
// This adds what <details> does not do by itself: Escape closes it and returns
// focus to the button, and so does a click or tap anywhere outside it.

const menu = document.querySelector('.languages');
if (menu) {
  const close = (refocus) => {
    if (!menu.open) return;
    menu.open = false;
    if (refocus) menu.querySelector('summary').focus();
  };
  menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });
  document.addEventListener('click', (e) => { if (!menu.contains(e.target)) close(false); });
}
