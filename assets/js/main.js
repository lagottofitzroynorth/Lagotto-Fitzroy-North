(function () {
  "use strict";

  /* ---------- accordion (info page) ----------
     the menu/drink list nests accordion-items inside other
     accordion-items' panels (Food, Cocktails, Wine by the Bottle, …),
     so toggling a nested item has to grow/shrink every open ancestor
     panel too, not just its own — otherwise the parent's max-height
     stays sized for the old (shorter) content and clips it. */
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "";

      /* ancestors get a generous flat max-height instead of a measured
         one — reading scrollHeight here would race the child's own
         max-height transition (still mid-animation toward its target),
         so a precise number would just measure a stale, in-between
         height. A large fixed value can't clip since real content is
         always shorter than it, and no measurement means no race. */
      var ancestorPanel = item.parentElement ? item.parentElement.closest(".accordion-panel") : null;
      while (ancestorPanel) {
        if (ancestorPanel.style.maxHeight) {
          ancestorPanel.style.maxHeight = "9999px";
        }
        ancestorPanel = ancestorPanel.parentElement ? ancestorPanel.parentElement.closest(".accordion-panel") : null;
      }
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
