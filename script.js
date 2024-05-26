document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.navbar a');

  links.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });

  function scrollToSection(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    let targetElement;

    if (targetId === 'bottom') {
      targetElement = document.documentElement;
    } else {
      targetElement = document.getElementById(targetId);
    }

    if (targetElement) {
      smoothScrollTo(targetElement.offsetTop, 1000);
    }
  }

  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(elapsedTime / duration, 1);
      const scrollValue = startPosition + distance * easeInOutQuad(scrollProgress);

      window.scrollTo(0, scrollValue);

      if (scrollProgress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scrollAnimation);
  }
});