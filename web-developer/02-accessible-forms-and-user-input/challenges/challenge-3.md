# Challenge 3: Explorer

**Optional.** Roughly 60 minutes.

Build an error summary that stays on the page.

## Task

The browser's own error messages disappear quickly and use the browser's language. A common, well-tested pattern is an **error summary**: a box at the top of the form that lists every problem, with links to each field.

1. Add `novalidate` to your registration `<form>`, so the browser stops showing its own messages.
2. Above the form, add an empty box:

   ```html
   <div id="error-summary" tabindex="-1" hidden>
     <h2>There is a problem</h2>
     <ul id="error-list"></ul>
   </div>
   ```

3. Before `</body>`, add this script. You will learn to write code like this in Course 1.6; for now, read the comments.

   ```html
   <script>
     const form = document.querySelector('form');
     const summary = document.getElementById('error-summary');
     const list = document.getElementById('error-list');

     form.addEventListener('submit', (event) => {
       list.innerHTML = '';
       // Every required field that is empty or invalid gets a link in the summary.
       const problems = [...form.querySelectorAll('[required]')].filter((field) => !field.checkValidity());
       if (problems.length === 0) return; // All good: let the form send.

       event.preventDefault();
       for (const field of problems) {
         const label = form.querySelector(`label[for="${field.id}"]`) || field.closest('fieldset').querySelector('legend');
         const item = document.createElement('li');
         item.innerHTML = `<a href="#${field.id}">${label.textContent}</a>`;
         list.append(item);
       }
       summary.hidden = false;
       summary.focus(); // Move focus to the summary so screen readers read it.
     });
   </script>
   ```

4. Send the empty form. The summary appears, focus moves to it, and each link takes you to a field.

## Why this matters

This pattern is used by government services around the world because it works for everyone, including screen-reader users and people who need more time. You have just used your first JavaScript to improve something HTML already did, rather than replace it.

## Done when

- [ ] Sending the empty form shows the summary, and focus moves to it.
- [ ] Each link in the summary takes you to the right field.
- [ ] A correctly filled form still sends.
