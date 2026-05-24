import $ from "jquery";

$(document).ready(main);

function main() {
  const year = new Date().getFullYear();
  const experience = Math.floor(
    (Date.now() - new Date("October 10, 2016")) / 31556952000
  ).toString();

  $("#copyright-year").text(year);
  $("#experience-years").text(experience);
  $("#experience-years-work").text(experience);

  $(".js-nav-link").on("click", handleNavClick);

  initScrollReveal();
  initActiveNav();
  initRailScrollProgress();
  $(window).on("resize", function () {
    updateRailIndicator($(".site-rail .nav-link.is-active").first());
  });
}

function handleNavClick(e) {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");
  const scrollto = e.currentTarget.getAttribute("data-scrollto");
  const target =
    document.querySelector(scrollto ? "." + scrollto : href) ||
    document.querySelector(href);

  const layout = document.querySelector(".mdl-layout");
  const drawer = document.querySelector(".mdl-layout__drawer.is-visible");
  if (layout && layout.MaterialLayout && drawer) {
    layout.MaterialLayout.toggleDrawer();
  }

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  setActiveNav(href);
}

function setActiveNav(href) {
  $(".js-nav-link").removeClass("is-active");
  $('.js-nav-link[href="' + href + '"]').addClass("is-active");
  updateRailIndicator($(".site-rail .nav-link[href='" + href + "']").first());
}

function updateRailIndicator($link) {
  const indicator = document.querySelector(".rail-active-indicator");
  const track = document.querySelector(".rail-track");

  if (!$link || !$link.length || !indicator || !track) {
    return;
  }

  const linkEl = $link[0];
  const trackRect = track.getBoundingClientRect();
  const linkRect = linkEl.getBoundingClientRect();
  const height = Math.round(linkRect.height);
  const offsetTop = Math.round(linkRect.top - trackRect.top);

  indicator.style.height = height + "px";
  indicator.style.transform = "translateY(" + offsetTop + "px)";
}

function initRailScrollProgress() {
  const progress = document.querySelector(".rail-scroll-progress");
  if (!progress) {
    return;
  }

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.height = pct + "%";
  }

  $(window).on("scroll", onScroll);
  onScroll();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initActiveNav() {
  const sections = document.querySelectorAll(".section-panel");

  if (!("IntersectionObserver" in window) || !sections.length) {
    return;
  }

  const visibility = new Map();
  sections.forEach(function (section) {
    visibility.set(section.id, 0);
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        visibility.set(
          entry.target.id,
          entry.isIntersecting ? entry.intersectionRatio : 0
        );
      });

      var bestId = sections[0].id;
      var bestRatio = 0;
      visibility.forEach(function (ratio, id) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestRatio > 0) {
        setActiveNav("#" + bestId);
      }
    },
    {
      threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
      rootMargin: "-12% 0px -40% 0px"
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  setTimeout(function () {
    updateRailIndicator($(".site-rail .nav-link.is-active").first());
  }, 150);
}
