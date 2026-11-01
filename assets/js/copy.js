/* 引用本書：按「複製」把引用格式複製到剪貼簿。 */
document.addEventListener('click', function (e) {
  var b = e.target.closest('button[data-copy]');
  if (!b) return;
  var text = b.getAttribute('data-copy');
  function done(ok) { var t = b.textContent; b.textContent = ok ? '已複製' : '請手動選取'; setTimeout(function () { b.textContent = t; }, 1600); }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
  } else {
    var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (err) {}
    ta.remove(); done(ok);
  }
});
