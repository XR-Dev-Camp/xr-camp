# Challenge 1: Foundation

**Required.** Roughly 60 minutes.

A navigation that collapses into a "Menu" button on small screens.

## Task

When a site has many pages, its navigation takes up the whole top of a phone screen. A common pattern is a **Menu** button that shows and hides it.

1. Before the navigation list, add a button:

   ```html
   <button type="button" id="menu-button" aria-expanded="false" aria-controls="main-menu" hidden>Menu</button>
   ```

   and give the `<ul>` the id `main-menu`.

2. Before `</body>`, add:

   ```html
   <script>
     const button = document.getElementById('menu-button');
     const menu = document.getElementById('main-menu');
     const small = matchMedia('(max-width: 40rem)');

     function setUp() {
       button.hidden = !small.matches;       // the button only exists on small screens
       menu.hidden = small.matches;          // start closed on small screens
       button.setAttribute('aria-expanded', 'false');
     }

     button.addEventListener('click', () => {
       const open = button.getAttribute('aria-expanded') === 'true';
       button.setAttribute('aria-expanded', String(!open));
       menu.hidden = open;
     });

     small.addEventListener('change', setUp);
     setUp();
   </script>
   ```

3. Test it with the keyboard and a screen reader at 390 pixels wide, and check that without JavaScript the menu simply stays open.

## Why this matters

`aria-expanded` tells screen-reader users whether the menu is open, and because the button starts `hidden` and the menu starts visible, the navigation still works if the script fails. That is progressive enhancement again, applied to navigation.

## Done when

- [ ] On a small screen, the menu starts closed and the button opens and closes it.
- [ ] The button announces "collapsed" and "expanded" in a screen reader.
- [ ] On a wide screen, there is no button and the menu is always visible.
