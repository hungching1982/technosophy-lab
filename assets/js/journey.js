/* 《設計永續》專頁：論證的旅程（定案：第十五版構圖，路線顏色由灰一路累積到第九章的橘）。
   桌機版即時繪製；寬度 760px 以下改顯示預先輸出的圖片（見 book.css）。 */
(function () {
  var GREY = [228, 227, 222], ORANGE = [247, 193, 162], WIDTH = 112;
  function layout(map) {
    var route = map.querySelector('.route'), RW = route.clientWidth;
    var sts = [].slice.call(route.querySelectorAll('.st'));
    var xL = [0.00, 0.035, -0.025, 0.045, 0.02], xR = [0.57, 0.54, 0.60, 0.535, 0.59];
    var bots = [], prev = 0;
    sts.forEach(function (el, i) {
      var k = Math.floor(i / 2);
      el.style.left = (RW * (i % 2 === 0 ? xL[k] : xR[k])) + 'px';
      el.style.width = (RW * 0.43) + 'px';
      var extra = (i === 8 || i === 9) ? 55 : 0;
      var t = i === 0 ? 0 : prev + (el.classList.contains('newseg') ? 12 : -36) + extra;
      el.style.top = t + 'px'; prev = t + el.offsetHeight; bots.push(prev);
    });
    route.style.height = Math.max.apply(null, bots) + 'px';
  }
  function draw() {
    var map = document.getElementById('argmap'), svg = document.getElementById('argrib');
    if (!map || getComputedStyle(map.querySelector('.route')).position === 'static') return;
    layout(map);
    var R = map.getBoundingClientRect(), W = R.width, H = R.height;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var E = [].slice.call(map.querySelectorAll('.st')).map(function (e) {
      var r = e.getBoundingClientRect(); return { top: r.top - R.top, bot: r.bottom - R.top };
    });
    var gaps = [420, 340, 460, 300, 390, 260, 350, 300, 400, 270, 340, 310, 400, 290];
    var amps = [0.20, 0.09, 0.23, 0.12, 0.07, 0.21, 0.11, 0.25, 0.08, 0.18, 0.13, 0.22, 0.09, 0.16];
    var P = [], y = -260, i = 0, z0 = E[5].top - 120, z1 = E[7].bot + 60;
    while (y < H + 300) {
      P.push({ x: W * (0.45 + (i % 2 ? 1 : -1) * amps[i % amps.length]), y: y });
      y += gaps[i % gaps.length] * ((y > z0 && y < z1) ? 1.45 : 1); i++;
    }
    var c7 = (E[7].top + E[7].bot) / 2, c8 = (E[8].top + E[8].bot) / 2, c9 = (E[9].top + E[9].bot) / 2;
    while (P.length && P[P.length - 1].y > c7 - 60) P.pop();
    if (P.length && P[P.length - 1].x < W * 0.45) P.pop();
    P.push({ x: W * 0.34, y: (E[7].top + E[7].bot * 2) / 3 });
    P.push({ x: W * 0.80, y: c8 });
    P.push({ x: W * 0.32, y: c9 + 20 });
    P.push({ x: W * 0.52, y: H + 260 });
    var pts = [];
    for (var k = 0; k < P.length - 1; k++) {
      var a = P[k], b = P[k + 1];
      for (var t = 0; t < 1; t += 0.02) {
        var u = (1 - Math.cos(Math.PI * t)) / 2;
        pts.push({ x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * t });
      }
    }
    var y0 = (E[0].top + E[0].bot) / 2;
    function tOf(yy) {
      if (yy <= c8) return 0.85 * Math.pow(Math.max(0, (yy - y0) / (c8 - y0)), 1.6);
      if (yy <= c9) return 0.85 + 0.15 * ((yy - c8) / (c9 - c8));
      return 1;
    }
    function mix(t) { return 'rgb(' + GREY.map(function (g, j) { return Math.round(g + (ORANGE[j] - g) * t); }).join(',') + ')'; }
    var out = '';
    for (var m = 0; m < pts.length - 1; m++) {
      var p = pts[m], q = pts[m + 1];
      out += '<path d="M' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ' L' + q.x.toFixed(1) + ',' + q.y.toFixed(1) +
        '" stroke="' + mix(tOf((p.y + q.y) / 2)) + '" stroke-width="' + WIDTH + '" stroke-linecap="round" fill="none"/>';
    }
    svg.innerHTML = out;
  }
  function start() { (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(draw); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  var timer; addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(draw, 150); });
})();
