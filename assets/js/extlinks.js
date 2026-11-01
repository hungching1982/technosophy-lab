/* 對外連結（站外網址與《設計永續》書籍頁）一律另開新視窗，並統一加上 ↗。
   規則集中在這裡，之後新增的連結會自動套用。 */
(function () {
  var here = location.pathname;
  var links = document.querySelectorAll('a[href]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    if (a.hasAttribute('data-zoom') || a.closest('sup.fn, .notes')) continue;
    var url;
    try { url = new URL(a.getAttribute('href'), location.href); } catch (e) { continue; }
    var external = url.protocol.indexOf('http') === 0 && url.host !== location.host;
    // 不在選單上的站內頁（書籍頁、課程頁），從其他頁面連過去時也視為對外連結
    var special = ['/design-for-green/', '/courses/'].filter(function (p) { return url.pathname.indexOf(p) === 0; })[0];
    var book = url.host === location.host && special && here.indexOf(special) !== 0;
    if (!external && !book) continue;
    a.target = '_blank';
    a.rel = 'noopener';
    if (!a.textContent.trim() || a.hasAttribute('data-noarrow')) continue;   // 只有圖片、或指定不加箭頭的連結
    var box = a.querySelector('.arrow');                       // 黑色按鈕裡的方塊箭頭
    if (box) { box.textContent = '↗'; }
    else if (a.textContent.indexOf('↗') === -1) {
      var t = a.lastChild;
      if (t && t.nodeType === 3 && /\s*→\s*$/.test(t.nodeValue)) t.nodeValue = t.nodeValue.replace(/\s*→\s*$/, '');
      var s = document.createElement('span'); s.setAttribute('aria-hidden', 'true'); s.className = 'ext-arrow'; s.textContent = ' ↗';
      a.appendChild(s);
    }
    var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = '（另開新視窗）';
    a.appendChild(sr);
  }
})();
