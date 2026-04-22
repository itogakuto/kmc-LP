(function () {
  var mediaQuery = window.matchMedia("(min-width: 768px)");

  function closeMobileMenu(toggle, nav) {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".primary-nav");

    if (!toggle || !nav) {
      return;
    }

    function syncNavState() {
      if (mediaQuery.matches) {
        closeMobileMenu(toggle, nav);
      }
    }

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      nav.classList.toggle("is-open", !expanded);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!mediaQuery.matches) {
          closeMobileMenu(toggle, nav);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMobileMenu(toggle, nav);
        toggle.focus();
      }
    });

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncNavState);
    } else {
      mediaQuery.addListener(syncNavState);
    }

    syncNavState();
  }

  function initScrollReveal() {
    var revealElements = document.querySelectorAll(".reveal");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!revealElements.length) {
      return;
    }

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, io) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");

        if (!href || href === "#") {
          return;
        }

        var target = document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.setAttribute("tabindex", "-1");
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start"
        });

        window.setTimeout(function () {
          target.focus({ preventScroll: true });
        }, reducedMotion ? 0 : 260);
      });
    });
  }

  initMobileNav();
  initScrollReveal();
  initSmoothScroll();
})();
