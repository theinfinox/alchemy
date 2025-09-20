
class EnhancedCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.carousel = document.getElementById("carousel");
    this.dotsContainer = document.getElementById("dots");
    this.playPauseBtn = document.getElementById("playPauseBtn");
    this.playPauseIcon = document.getElementById("playPauseIcon");
    this.playPauseText = document.getElementById("playPauseText");
    this.progressBar = document.getElementById("progressBar");

    this.index = 0;
    this.isPlaying = true;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;
    this.progressInterval = null;

    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;

    this.init();
  }

  init() {
    this.createDots();
    this.createParticles();
    this.updateSlide();
    this.startAutoPlay();
    this.bindEvents();
  }

  createDots() {
    this.slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    });
  }

  createParticles() {
    const particlesContainer = document.getElementById("particles");
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 20 + "s";
      particlesContainer.appendChild(particle);
    }
  }

  updateSlide() {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === this.index);
    });
    const containerWidth = this.carousel.parentElement.offsetWidth;
    const slideWidth = 310;
    const offset = (this.index * -slideWidth) + (containerWidth / 2 - 140);
    this.carousel.style.transform = `translateX(${offset}px)`;

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === this.index);
    });
  }

  changeSlide(dir) {
    this.index = (this.index + dir + this.slides.length) % this.slides.length;
    this.updateSlide();
    this.restartAutoPlay();
  }

  goToSlide(i) {
    this.index = i;
    this.updateSlide();
    this.restartAutoPlay();
  }

  startAutoPlay() {
    if (this.isPlaying) {
      this.autoPlayInterval = setInterval(() => {
        this.changeSlide(1);
      }, this.autoPlayDelay);
      this.startProgressBar();
    }
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.autoPlayInterval = null;
    this.stopProgressBar();
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    if (this.isPlaying) this.startAutoPlay();
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoPlay();
      this.playPauseIcon.textContent = "⏸️";
      this.playPauseText.textContent = "Pause";
    } else {
      this.stopAutoPlay();
      this.playPauseIcon.textContent = "▶️";
      this.playPauseText.textContent = "Play";
    }
  }

  startProgressBar() {
    this.stopProgressBar();
    const start = Date.now();
    this.progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min((elapsed / this.autoPlayDelay) * 100, 100);
      this.progressBar.style.width = progress + "%";
    }, 50);
  }

  stopProgressBar() {
    clearInterval(this.progressInterval);
    this.progressInterval = null;
    this.progressBar.style.width = "0%";
  }

  bindEvents() {
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());

    this.carousel.addEventListener('mouseenter', () => {
      if (this.isPlaying) this.stopAutoPlay();
    });

    this.carousel.addEventListener('mouseleave', () => {
      if (this.isPlaying) this.startAutoPlay();
    });

    this.handleKeyboard();
  }

  handleKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (["ArrowLeft","ArrowRight"," ","Home","End"].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowLeft") this.changeSlide(-1);
      if (e.key === "ArrowRight") this.changeSlide(1);
      if (e.key === " ") this.togglePlayPause();
      if (e.key === "Home") this.goToSlide(0);
      if (e.key === "End") this.goToSlide(this.slides.length-1);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new EnhancedCarousel());
