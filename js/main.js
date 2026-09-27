(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector(".sr-only").textContent = open
        ? "Cerrar menú"
        : "Abrir menú";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector(".sr-only").textContent = "Abrir menú";
      });
    });
  }
})();

(function () {
  var triggers = document.querySelectorAll(".faq-trigger");

  triggers.forEach(function (trigger) {
    var answer = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!answer) return;

    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        answer.style.height = answer.scrollHeight + "px";
        requestAnimationFrame(function () {
          answer.style.height = "0px";
        });
        trigger.setAttribute("aria-expanded", "false");
      } else {
        trigger.setAttribute("aria-expanded", "true");
        answer.style.height = answer.scrollHeight + "px";

        answer.addEventListener(
          "transitionend",
          function onOpenEnd(e) {
            if (e.propertyName === "height") {
              answer.style.height = "auto";
              answer.removeEventListener("transitionend", onOpenEnd);
            }
          }
        );
      }
    });

    answer.style.height = "0px";
  });
})();
