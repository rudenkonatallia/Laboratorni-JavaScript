document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slides');
  const dotsContainer = document.querySelector('.dots');
  const slideCount = slides.length;
  let autoSlideTimer;

  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
      showSlide(index);
      restartTimer();
    });
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function showSlide(index) {
    currentSlide = index;
    const offset = -currentSlide * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }

  document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    restartTimer();
  });

  document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    restartTimer();
  });

  function startTimer() {
    autoSlideTimer = setInterval(nextSlide, 4000);
  }

  function restartTimer() {
    clearInterval(autoSlideTimer);
    startTimer();
  }

  showSlide(currentSlide);
  startTimer();
});
