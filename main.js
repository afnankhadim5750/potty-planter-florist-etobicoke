// The Potty Planter Florist (light botanical atelier redesign):
// mobile menu, scroll-spy, gallery lightbox, order form (mailto).
(function () {
  "use strict";

  // Mobile menu: toggle instantly (no transition), closes on link tap.
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-mobile-menu]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Scroll-spy: highlight the nav link for the section in view.
  var spySections = document.querySelectorAll("main section[id]");
  var navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];
  if ("IntersectionObserver" in window && spySections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spySections.forEach(function (s) { spy.observe(s); });
  }

  // Lightbox for the masonry gallery tiles.
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  document.querySelectorAll(".masonry-tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = tile.getAttribute("data-full");
      lightboxImg.alt = tile.getAttribute("data-alt") || "";
      lightbox.hidden = false;
    });
  });
  function closeLightbox() {
    if (lightbox) lightbox.hidden = true;
    if (lightboxImg) lightboxImg.src = "";
  }
  var closeBtn = document.querySelector(".lightbox-close");
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Order form: compose an email to the shop, no invented backend.
  var form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("f-name").value.trim();
      var occasion = document.getElementById("f-occasion").value;
      var fulfil = form.querySelector("input[name='fulfilment']:checked");
      var message = document.getElementById("f-message").value.trim();
      var body =
        "Name: " + name + "\n" +
        "Occasion: " + occasion + "\n" +
        "Delivery or pickup: " + (fulfil ? fulfil.value : "Delivery") + "\n" +
        "Message: " + message;
      window.location.href =
        "mailto:thepottyplanter@rogers.com" +
        "?subject=" + encodeURIComponent("Flower order enquiry from " + name) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
