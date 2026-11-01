/* 書衣燈箱：點圖在本頁放大；點任何地方、按 Esc 或「關閉」都會關掉。 */
(function () {
  var box = null, opener = null;
  function close() {
    if (!box) return;
    box.remove(); box = null; document.documentElement.classList.remove('lb-open');
    if (opener) opener.focus();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-zoom]');
    if (!a) return;
    e.preventDefault(); opener = a;
    var alt = (a.querySelector('img') || {}).alt || '';
    box = document.createElement('div');
    box.className = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', alt.replace('，點擊放大', '') + '（放大檢視）');
    box.innerHTML = '<button type="button">關閉 ✕</button><img alt="">';
    box.querySelector('img').src = a.href;
    box.querySelector('img').alt = alt.replace('，點擊放大', '');
    box.addEventListener('click', close);
    document.body.appendChild(box); document.documentElement.classList.add('lb-open');
    box.querySelector('button').focus();
  });
  document.addEventListener('keydown', function (e) {
    if (!box) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') { e.preventDefault(); box.querySelector('button').focus(); }
  });
})();
