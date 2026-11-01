/* 即將到來的消息：日期是今天（台灣時間）或之後，標籤改成橘底。日期一過自動恢復黑色。 */
(function () {
  var today;
  try {
    today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  } catch (e) { return; }
  var items = document.querySelectorAll('[data-date]');
  for (var i = 0; i < items.length; i++) {
    var el = items[i];
    if (el.getAttribute('data-date') >= today) {
      el.classList.add('upcoming');
      var tag = el.querySelector('.tag');
      if (tag) {
        var sr = document.createElement('span');
        sr.className = 'sr-only';
        sr.textContent = '（即將舉行）';
        tag.appendChild(sr);
      }
    }
  }
})();
