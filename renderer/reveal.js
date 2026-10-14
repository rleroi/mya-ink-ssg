// `v-reveal`: fade elements in when they scroll into view.
// Server-rendered HTML stays fully visible; only the client adds the hidden state.

let observer = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px' });
  }

  return observer;
}

export const reveal = {
  getSSRProps() {
    return {};
  },
  mounted(el) {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    // Already on screen at load: don't hide and re-show it
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      return;
    }

    el.classList.add('reveal');
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
