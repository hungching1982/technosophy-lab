/* 頁面瀏覽次數：讀取 GoatCounter 的公開計數（需在後台勾選 Allow adding visitor counts）。
   用法：<span data-viewcount="/design-for-green/" hidden>…<span class="vc-n"></span>…</span>
   讀取失敗（例如讀者裝了廣告阻擋外掛）時維持隱藏。數字最多約 4 小時更新一次。 */
(function () {
  var code = document.documentElement.getAttribute('data-gc');
  if (!code) return;
  document.querySelectorAll('[data-viewcount]').forEach(function (el) {
    var path = el.getAttribute('data-viewcount');
    fetch('https://' + code + '.goatcounter.com/counter/' + encodeURIComponent(path) + '.json')
      .then(function (r) { if (!r.ok) throw r; return r.json(); })
      .then(function (d) {
        if (!d || !d.count) return;
        el.querySelector('.vc-n').textContent = d.count;
        el.hidden = false;
      })
      .catch(function () {});
  });
})();
