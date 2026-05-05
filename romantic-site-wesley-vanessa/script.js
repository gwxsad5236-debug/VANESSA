const stages = document.querySelectorAll('.stage');
const buttons = document.querySelectorAll('[data-next]');
const surpriseBtn = document.getElementById('surpriseBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('closeLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const galleryImages = document.querySelectorAll('.gallery-grid img');
const toggleMusic = document.getElementById('toggle-music');
const backgroundAudio = document.getElementById('backgroundAudio');
const musicQuickAccess = document.getElementById('musicQuickAccess');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');

const startDate = new Date('2026-04-04T00:00:00');

function showStage(pageName) {
  stages.forEach((stage) => {
    stage.classList.toggle('active', stage.dataset.page === pageName);
  });

  if (musicQuickAccess) {
    musicQuickAccess.classList.toggle('active', pageName !== 'tempo');
  }

  // Animate timeline items when history stage is shown
  if (pageName === 'historia') {
    setTimeout(() => {
      const timelineItems = document.querySelectorAll('.timeline-content');
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.animationDelay = `${index * 0.3}s`;
          item.style.animationPlayState = 'running';
        }, index * 300);
      });
    }, 600);
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextPage = button.dataset.next;
    const current = document.querySelector('.stage.active');
    if (nextPage && current) {
      current.classList.add('exiting');
      setTimeout(() => {
        current.classList.remove('active', 'exiting');
        showStage(nextPage);
      }, 250);
    }
  });
});

const backButtons = document.querySelectorAll('[data-prev]');
backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const prevPage = button.dataset.prev;
    const current = document.querySelector('.stage.active');
    if (prevPage && current) {
      current.classList.add('exiting');
      setTimeout(() => {
        current.classList.remove('active', 'exiting');
        showStage(prevPage);
      }, 250);
    }
  });
});

if (musicQuickAccess) {
  musicQuickAccess.addEventListener('click', () => {
    const current = document.querySelector('.stage.active');
    if (current) {
      current.classList.add('exiting');
      setTimeout(() => {
        current.classList.remove('active', 'exiting');
        showStage('tempo');
      }, 250);
    } else {
      showStage('tempo');
    }
  });
}

if (surpriseBtn) {
  surpriseBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
  });
}

closeModal.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
});

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal.click();
  }
});

function updateCounter() {
  const now = new Date();
  const diff = Math.max(0, now - startDate);
  const minutes = Math.floor(diff / (1000 * 60));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) - months * 30;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const mins = Math.floor(diff / (1000 * 60)) % 60;

  monthsEl.textContent = months;
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = mins;
}

updateCounter();
setInterval(updateCounter, 60 * 1000);

galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    const fullSrc = image.dataset.full || image.src;
    lightboxImage.src = fullSrc;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox.click();
  }
});

showStage(document.querySelector('.stage.active')?.dataset.page || 'home');

if (toggleMusic) {
  const audioAvailable = backgroundAudio && backgroundAudio.src;

  toggleMusic.addEventListener('click', () => {
    if (!audioAvailable) {
      window.open('https://www.youtube.com/results?search_query=%C3%89+Tudo+Sobre+Voc%C3%AA+Morada', '_blank', 'noopener');
      return;
    }

    if (backgroundAudio.paused) {
      backgroundAudio.play().catch(() => {
        window.open('https://www.youtube.com/results?search_query=%C3%89+Tudo+Sobre+Voc%C3%AA+Morada', '_blank', 'noopener');
      });
      toggleMusic.classList.add('playing');
      toggleMusic.innerHTML = '<span class="play-icon">⏸️</span> Pausar Música';
    } else {
      backgroundAudio.pause();
      toggleMusic.classList.remove('playing');
      toggleMusic.innerHTML = '<span class="play-icon">▶️</span> Tocar Música';
    }
  });
}
