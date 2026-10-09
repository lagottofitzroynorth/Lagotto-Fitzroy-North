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
  /* deep links (e.g. more#menus from the Google Business Profile) —
     open the named section, plus any sections it sits inside, then
     scroll to it. Without this the link lands on a fully collapsed page. */
  function openFromHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    var target = id && document.getElementById(id);
    if (!target || !target.classList.contains("accordion-item")) return;
    var chain = [];
    for (var el = target; el; el = el.parentElement ? el.parentElement.closest(".accordion-item") : null) {
      chain.unshift(el);
    }
    chain.forEach(function (item) {
      if (!item.classList.contains("is-open")) {
        item.querySelector(".accordion-trigger").click();
      }
    });
    target.scrollIntoView({ block: "start" });
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  /* keep open panels sized correctly if content reflows (fonts loading, resize,
     the embedded newsletter iframe finishing its own load)
     — direct-child only: a descendant selector would also size the
     closed panels nested inside an open one (eg. Beverages under Menus),
     revealing them. Android fires resize whenever the address bar
     shows/hides on scroll, so that bug shows up just from scrolling. */
  window.addEventListener("resize", function () {
    document.querySelectorAll(".accordion-item.is-open > .accordion-panel").forEach(function (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  });
})();
