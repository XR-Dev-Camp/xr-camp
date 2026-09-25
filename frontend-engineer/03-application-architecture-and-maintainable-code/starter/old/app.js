// app
var a = []
var x = false

try { a = JSON.parse(localStorage.getItem('xrc_s')) || [] } catch (e) { alert('Error!') }

function go() {
  document.getElementById('app').innerHTML = '<p>Plan your study sessions for this week.</p>' +
    '<form onsubmit="add(); return false"><p><label for="d">Day</label><br><select id="d">' +
    '<option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option></select></p>' +
    '<p><label for="t">Time</label><br><input id="t" type="time" value="19:00"></p>' +
    '<p><label for="w">What will you study?</label><br><input id="w" type="text"></p>' +
    '<p><button>Add session</button></p></form><div id="out"></div>'
  fn2()
}

// this function renders
function fn2() {
  var h = ''
  var n = 0
  var dn = 0
  // sort
  a.sort(function (p, q) {
    var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    if (days.indexOf(p.d) != days.indexOf(q.d)) return days.indexOf(p.d) - days.indexOf(q.d)
    return p.t < q.t ? -1 : 1
  })
  h += '<h2>Still to do</h2><ul>'
  for (var i = 0; i < a.length; i++) {
    if (!a[i].done) {
      n++
      h += '<li>' + a[i].d + ' at ' + a[i].t + ': ' + a[i].w + ' <button onclick="tog(' + i + ')">Done</button> <button onclick="del(' + i + ')">Delete</button></li>'
    }
  }
  h += '</ul><h2>Done</h2><ul>'
  for (var i = 0; i < a.length; i++) {
    if (a[i].done) {
      dn++
      h += '<li>' + a[i].d + ' at ' + a[i].t + ': ' + a[i].w + ' <button onclick="tog(' + i + ')">Not done</button> <button onclick="del(' + i + ')">Delete</button></li>'
    }
  }
  h += '</ul>'
  // 45 minutes each
  var m = dn * 45
  h += '<p>' + dn + ' of 4 sessions done this week (' + Math.floor(m / 60) + ' hours ' + (m % 60) + ' minutes).</p>'
  if (dn >= 4) h += '<p>Well done! Goal reached!</p>'
  document.getElementById('out').innerHTML = h
  localStorage.setItem('xrc_s', JSON.stringify(a))
}

function add() {
  var w = document.getElementById('w').value
  if (w == '') { alert('Error!'); return }
  a.push({ d: document.getElementById('d').value, t: document.getElementById('t').value, w: w, done: false })
  document.getElementById('w').value = ''
  fn2()
}

function tog(i) { a[i].done = !a[i].done; fn2() }
function del(i) { a.splice(i, 1); x = true; fn2() }

go()
