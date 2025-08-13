(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-dark shadow");
      } else {
        $(".fixed-top").removeClass("bg-dark shadow");
      }
    } else {
      if ($(this).scrollTop() > 45) {
        $(".fixed-top").addClass("bg-dark shadow").css("top", -45);
      } else {
        $(".fixed-top").removeClass("bg-dark shadow").css("top", 0);
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Causes progress
  $(".causes-progress").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );
})(jQuery);

$(document).ready(function () {
  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 6000,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
});

const counters = document.querySelectorAll(".counter");
const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";

  const speed = 200;
  const increment = Math.ceil(target / speed);

  const updateCount = () => {
    let count = +counter.innerText.replace(/\D/g, "");

    if (count < target) {
      count += increment;
      counter.innerText = count.toLocaleString();
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target.toLocaleString() + suffix;
    }
  };
  updateCount();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => observer.observe(counter));

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    576: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    992: { slidesPerView: 5 },
  },
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    576: { slidesPerView: 4 },
    768: { slidesPerView: 5 },
    992: { slidesPerView: 6 },
  },
});

function sendEmail() {
  let name = document.getElementById("userName").value.trim();
  let email = document.getElementById("userEmail").value.trim();
  let message = document.getElementById("userMsg").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  let subject = encodeURIComponent("Inquiry from " + name);
  let body = encodeURIComponent(
    "Name: " + name + "\n" + "Email: " + email + "\n\n" + "Message:\n" + message
  );

  window.location.href = `mailto:reachus@goducate.org?subject=${subject}&body=${body}`;
}

function copyAndOpen(target) {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const msg = document.getElementById("userMsg").value.trim();

  if (!name || !email || !msg) {
    Swal.fire({
      icon: "error",
      title: "Incomplete Form",
      text: "Please fill out all fields before sending.",
    });
    return;
  }

  const finalMessage = `Hi! I’m ${name} (${email}).\n\n${msg}`;

  navigator.clipboard
    .writeText(finalMessage)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Message Copied!",
        text: "Your message has been copied. Paste it into Messenger in the next tab.",
        confirmButtonText: "Open Messenger",
      }).then(() => {
        // Always open the CLIKS Staycation Page
        window.open("https://m.me/Goducate.Helping.Needy.Asians", "_blank");
      });
    })
    .catch(() => {
      Swal.fire({
        icon: "warning",
        title: "Copy Failed",
        text: "Your browser blocked clipboard access. Please copy manually.",
      });
    });
}
