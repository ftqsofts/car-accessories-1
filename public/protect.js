(function () {
  // ── Disable right click ──
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  // ── Disable text selection ──
  document.addEventListener("selectstart", function (e) { e.preventDefault(); });

  // ── Disable image dragging ──
  document.addEventListener("dragstart", function (e) { e.preventDefault(); });

  // ── Disable keyboard shortcuts ──
  document.addEventListener("keydown", function (e) {
    var mac = e.metaKey, win = e.ctrlKey, key = e.key.toLowerCase();
    if ((win || mac) && ["a","c","x","v","s","u","p"].includes(key)) { e.preventDefault(); return false; }
    if (e.key === "F12") { e.preventDefault(); return false; }
    if ((win || mac) && e.shiftKey && ["i","j","c"].includes(key)) { e.preventDefault(); return false; }
  });

  // ── CSS: no selection, no image drag ──
  var style = document.createElement("style");
  style.innerHTML = "* { user-select: none !important; -webkit-user-select: none !important; } img { pointer-events: none !important; -webkit-user-drag: none !important; }";
  document.head.appendChild(style);

  // ── Debugger trap — freezes Sources panel ──
  function debuggerTrap() {
    setInterval(function () {
      (function () { debugger; })();
    }, 50);
  }
  debuggerTrap();

  // ── Console flood — clears and warns repeatedly ──
  setInterval(function () {
    console.clear();
    console.log("%c⚠️ Stop!", "color:red;font-size:40px;font-weight:bold;");
    console.log("%cهذه الصفحة محمية. لا يُسمح بفحص الكود.", "color:red;font-size:16px;");
  }, 1000);

  // ── Devtools detection (event-based via devtools-detect logic) ──
  var warningHTML = '<div style="display:flex;height:100vh;align-items:center;justify-content:center;text-align:center;font-family:sans-serif;background:#fff"><div><h1 style="color:red;margin-bottom:12px">⚠️ غير مسموح</h1><p style="margin-bottom:8px">Developer Tools غير مسموح بها على هذه الصفحة.</p><p>أغلق Developer Tools و <a href="">حدّث الصفحة</a></p></div></div>';

  var devtools = { isOpen: false, orientation: undefined };
  var threshold = 170;

  function emitEvent(isOpen, orientation) {
    window.dispatchEvent(new CustomEvent("devtoolschange", { detail: { isOpen: isOpen, orientation: orientation } }));
  }

  function checkDevTools() {
    var widthThreshold = window.outerWidth - window.innerWidth > threshold;
    var heightThreshold = window.outerHeight - window.innerHeight > threshold;
    var orientation = widthThreshold ? "vertical" : "horizontal";

    if (!(heightThreshold && widthThreshold) && (widthThreshold || heightThreshold)) {
      if (!devtools.isOpen || devtools.orientation !== orientation) emitEvent(true, orientation);
      devtools.isOpen = true;
      devtools.orientation = orientation;
    } else {
      if (devtools.isOpen) emitEvent(false, undefined);
      devtools.isOpen = false;
      devtools.orientation = undefined;
    }
  }

  setInterval(checkDevTools, 500);

  window.addEventListener("devtoolschange", function (e) {
    if (e.detail.isOpen) {
      document.body.innerHTML = warningHTML;
    }
  });
})();