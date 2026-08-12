(function () {
  "use strict";

  /* ---------- accordion (info page) ---------- */
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "";
    });
  });
  /* keep open panels sized correctly if content reflows (fonts loading, resize,
     the embedded newsletter iframe finishing its own load) */
  window.addEventListener("resize", function () {
    document.querySelectorAll(".accordion-item.is-open .accordion-panel").forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });
})();
