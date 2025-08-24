// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');

  // Check if elements exist before adding event listeners
  if (mobileMenuBtn && navLinks && header) {
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      header.classList.toggle('menu-open');

      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking on navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        header.classList.remove('menu-open');

        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        header.classList.remove('menu-open');

        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });

    // Close menu on window resize (when switching from mobile to desktop)
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        header.classList.remove('menu-open');

        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  }

  // Options for the observer (e.g., start when 50px of the slider is visible)
  const observerOptions = {
    root: null, // observes intersections relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // Triggers when 10% of the slider is visible
  };

  // // The function that runs when a slider enters the screen
  // const sliderObserverCallback = (entries, observer) => {
  //   entries.forEach(entry => {
  //     // If the slider is on screen
  //     if (entry.isIntersecting) {
  //       const slider = entry.target;

  //       // Initialize Swiper on this specific slider
  //       new Swiper(slider, {
  //         loop: true,
  //         pagination: {
  //           el: slider.querySelector('.swiper-pagination'),
  //           clickable: true,
  //         },
  //         navigation: {
  //           nextEl: slider.querySelector('.swiper-button-next'),
  //           prevEl: slider.querySelector('.swiper-button-prev'),
  //         },
  //         autoplay: {
  //           delay: 3000,
  //           disableOnInteraction: false,
  //           pauseOnMouseEnter: true,
  //         },
  //       });

  //       // Stop observing this slider since it's now initialized
  //       observer.unobserve(slider);
  //     }
  //   });
  // };

  // // Create the observer
  // const sliderObserver = new IntersectionObserver(sliderObserverCallback, observerOptions);

  // // Tell the observer to watch all '.center-slider' elements
  // const allSliders = document.querySelectorAll('.center-slider');
  // allSliders.forEach(slider => {
  //   sliderObserver.observe(slider);
  // });

});

// Back to top functionality
window.addEventListener('scroll', function () {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

// Back to top button click event
document.addEventListener('DOMContentLoaded', function () {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});