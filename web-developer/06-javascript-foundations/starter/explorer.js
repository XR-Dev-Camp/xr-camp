// Programme explorer
// ------------------
// Work through the TODOs in order: each one is a step in the lesson guide.
// Keep the browser's console open (F12, then Console) the whole time:
// it shows your console.log messages, and any errors, with line numbers.

// TODO 1: Check this file is connected. Write a console.log message, save,
// reload the page, and find your message in the console.


// 1. The data --------------------------------------------------------------

// An array of objects: each object is one programme.
const programmes = [
  { id: 'homework', name: 'Homework club', audience: 'children', day: 'Weekdays', time: '4pm', free: true, description: 'Quiet space and volunteers to help with school work.' },
  { id: 'english', name: 'English conversation practice', audience: 'adults', day: 'Tuesday and Thursday', time: '10am', free: true, description: 'Practise speaking English with friendly volunteers.' },
  { id: 'lunch', name: 'Community lunch', audience: 'everyone', day: 'Sunday', time: '1pm', free: false, description: 'A shared meal, cooked by volunteers. Pay what you can.' },
  // TODO 2: Add at least three more programmes, in the same shape. Use the
  // programmes from your own site if you have them.
];

const audienceLabels = { children: 'Children and young people', adults: 'Adults', everyone: 'Everyone' };


// 2. Finding elements on the page ------------------------------------------

// TODO 3: Use document.querySelector to find #search, #audience, #free-only,
// #results, #count, and #saved, and keep each in a const.


// 3. Drawing cards ---------------------------------------------------------

// TODO 4: Write a function createCard(programme) that creates an <li
// class="card"> containing an <h3> with the name, a <p> saying when it runs
// and whether it is free, a <p> with the description, and a <p class="tag">
// with the audience label. Use textContent, never innerHTML, for text.
// Return the card.


// 4. Showing results -------------------------------------------------------

// TODO 5: Write a function showResults() that empties #results and appends a
// card for every programme, using a for...of loop. Call it at the bottom of
// this file. Reload: all your programmes should appear.

// TODO 6: In showResults, set the text of #count to "Showing 3 of 6
// programmes." with the real numbers, using a template literal: `...${...}...`.


// 5. Filtering -------------------------------------------------------------

// TODO 7: Write a function matches(programme) that returns true or false:
// false if the search words are not in the name or description, false if an
// audience is chosen and it is different, false if "free only" is ticked and
// the programme is not free. Otherwise true. Then use
// programmes.filter(matches) in showResults.

// TODO 8: Listen for the "input" event on the #filters form, and call
// showResults every time. Also listen for its "submit" event (the "Show
// results" button): call event.preventDefault() so the page does not reload,
// then showResults(), then move focus to #count.

// TODO 9: When nothing matches, make #count say so, and suggest what to try.


// 6. Saving in the browser --------------------------------------------------

// TODO 10: Give every card a button, "Save <name>", with aria-pressed="false"
// and data-id set to the programme's id. When it is clicked, add the id to a
// savedIds array, or remove it if it is already there, and update aria-pressed.

// TODO 11: Keep savedIds in localStorage, as JSON, so it survives a reload.
// Wrap every localStorage call in try...catch: it can be switched off.

// TODO 12: Write showSaved(), which lists the saved programmes in #saved, or
// says "Nothing saved yet" when the list is empty. Call it on load and after
// every change.
