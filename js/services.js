document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((serviceItem) => {
    const slides = serviceItem.querySelectorAll(".slide");
    const prevBtn = serviceItem.querySelector(".slider-btn.prev");
    const nextBtn = serviceItem.querySelector(".slider-btn.next");
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateButtons() {
      if (currentIndex === 0) {
        prevBtn.classList.add("inactive");
      } else {
        prevBtn.classList.remove("inactive");
      }

      if (currentIndex === totalSlides - 1) {
        nextBtn.classList.add("inactive");
      } else {
        nextBtn.classList.remove("inactive");
      }
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
      updateButtons();
    }

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        showSlide(currentIndex);
      }
    });

    updateButtons();
  });

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  serviceItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease-out";
    observer.observe(item);
  });
});
