window.addEventListener("DOMContentLoaded", () => {
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    document.getElementById("cookieConsent").classList.add("active");
    document.body.classList.add("blur-background");
  }
});

function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  closeCookiePopup();
}

function rejectCookies() {
  localStorage.setItem("cookieConsent", "rejected");
  closeCookiePopup();
}

function closeCookiePopup() {
  const cookieOverlay = document.getElementById("cookieConsent");
  cookieOverlay.style.animation = "fadeOut 0.3s ease-out";

  setTimeout(() => {
    cookieOverlay.classList.remove("active");
    document.body.classList.remove("blur-background");
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      menuToggle.classList.toggle("active");

      const spans = menuToggle.querySelectorAll("span");
      if (menuToggle.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translateY(8px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

let lastScroll = 0;
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

const style = document.createElement("style");
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .fade-in, .fade-in-delay"
  );
  animatedElements.forEach((el) => observer.observe(el));
});
