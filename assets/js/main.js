/* Mintree — site scripts (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
    });
    document.addEventListener("click", function (e) {
      if (!links.classList.contains("is-open")) return;
      if (e.target.closest(".nav")) return;
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---------- Nav border on scroll ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Hero headline: split into words and stagger ---------- */
  var title = document.querySelector("[data-split-words]");
  if (title) {
    var stagger = 90;
    var i = 0;
    // Walk text nodes only, so wrapped spans (gradient words) keep their markup.
    var walk = function (node, inGrad) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span");
            // Gradient words carry the gradient themselves: background-clip:text
            // on a parent does not survive a filtered/transformed child.
            w.className = inGrad ? "w grad-text" : "w";
            w.textContent = part;
            w.style.animationDelay = (i++ * stagger) + "ms";
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          var isGrad = child.classList.contains("grad-text");
          walk(child, inGrad || isGrad);
          if (isGrad) { child.classList.remove("grad-text"); child.classList.add("grad-text-host"); }
        }
      });
    };
    walk(title, false);
  }

  /* ---------- Scroll reveal fallback (IntersectionObserver) ---------- */
  var supportsScrollTimeline =
    typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: view()");

  if (!supportsScrollTimeline && !reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
