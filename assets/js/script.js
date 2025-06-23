// Create animated particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = window.innerWidth < 768 ? 30 : 60;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in, .timeline-item");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.8) {
      element.classList.add("animate");
    }
  });
}

// Smooth scrolling for CTA buttons
function setupSmoothScroll() {
  const ctaButtons = document.querySelectorAll(".cta-button");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  setupSmoothScroll();
  animateOnScroll();

  // Add scroll event listener
  window.addEventListener("scroll", animateOnScroll);

  // Resize handler for particles
  window.addEventListener("resize", function () {
    const particlesContainer = document.getElementById("particles");
    particlesContainer.innerHTML = "";
    createParticles();
  });
});

// Add floating animation to hero elements
document.addEventListener("DOMContentLoaded", function () {
  const heroContent = document.querySelector(".hero-content");
  let ticking = false;

  function updateHeroParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    if (heroContent) {
      heroContent.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
  }

  function requestParallaxTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeroParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestParallaxTick);
});

//faq
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const parentItem = question.closest(".faq-item");
      const answer = parentItem.querySelector(".faq-answer");
      const icon = question.querySelector(".icon");

      // Close other open answers
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== parentItem) {
          const otherAnswer = item.querySelector(".faq-answer");
          const otherQuestion = item.querySelector(".faq-question");
          const otherIcon = item.querySelector(".icon");

          if (
            otherAnswer.style.maxHeight !== "0px" &&
            otherAnswer.style.maxHeight !== ""
          ) {
            otherAnswer.style.maxHeight = "0";
            otherAnswer.style.padding = "0px";
            otherQuestion.classList.remove("active");
            otherIcon.style.transform = "rotate(0deg)";
          }
        }
      });

      // Toggle current answer
      if (answer.style.maxHeight === "0px" || answer.style.maxHeight === "") {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding =
          "5px 0 0"; /* Add a small top padding to separate from question */
        question.classList.add("active");
        icon.style.transform = "rotate(45deg)";
      } else {
        answer.style.maxHeight = "0";
        answer.style.padding = "0";
        question.classList.remove("active");
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
});
