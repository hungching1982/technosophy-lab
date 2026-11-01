/* 試讀注釋：桌機點注號顯示浮出視窗；手機直接跳到注釋（必要時先展開「繼續閱讀」）。 */
(function () {
  var pop = null, current = null;
  function close() { if (pop) { pop.remove(); pop = null; } if (current) { current.setAttribute('aria-expanded', 'false'); current = null; } }
  function openDetails(el) { var d = el.closest('details'); if (d && !d.open) d.open = true; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('sup.fn a');
    if (!a) { if (pop && !e.target.closest('.fn-pop')) close(); return; }
    var id = a.getAttribute('href').slice(1), note = document.getElementById(id);
    if (!note) return;
    e.preventDefault();
    if (current === a) { close(); return; }
    close();
    if (window.matchMedia('(max-width: 760px)').matches) {
      openDetails(note); document.querySelectorAll('.notes li.hit').forEach(function (x) { x.classList.remove('hit'); }); note.classList.add('hit'); note.scrollIntoView({ block: 'center' }); history.replaceState(null, '', '#' + id); return;
    }
    var clone = note.cloneNode(true), back = clone.querySelector('.back'); if (back) back.remove();
    pop = document.createElement('div'); pop.className = 'fn-pop'; pop.setAttribute('role', 'note');
    pop.innerHTML = '<b>' + a.textContent + '</b>' + clone.innerHTML;
    document.body.appendChild(pop);
    var r = a.getBoundingClientRect(), w = pop.offsetWidth;
    var left = Math.min(Math.max(12, r.left + window.scrollX - 20), window.scrollX + document.documentElement.clientWidth - w - 12);
    pop.style.left = left + 'px'; pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
    current = a; a.setAttribute('aria-expanded', 'true');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.notes .back'); if (!b) return;
    var t = document.getElementById(b.getAttribute('href').slice(1)); if (t) openDetails(t);
  }, true);
})();
