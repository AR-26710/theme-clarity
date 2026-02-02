export function moments_tags() {
  const scrollContainers = document.querySelectorAll<HTMLElement>(".scrollcheck-x");

  scrollContainers.forEach((container) => {
    const wrapper = container.closest<HTMLElement>(".moments-tags-wrapper");
    const hoverHint = wrapper?.querySelector<HTMLElement>(".at-slide-hover");

    const checkScrollable = () => {
      const isScrollable = container.scrollWidth > container.clientWidth;
      if (hoverHint) {
        if (isScrollable) {
          hoverHint.style.display = "inline-flex";
        } else {
          hoverHint.style.display = "none";
        }
      }
    };

    const scrollToActiveTag = () => {
      const activeTag = container.querySelector<HTMLElement>(".tag-item.active");
      if (!activeTag) return;

      const containerRect = container.getBoundingClientRect();
      const tagRect = activeTag.getBoundingClientRect();

      if (tagRect.right > containerRect.right) {
        const scrollAmount = tagRect.right - containerRect.right;
        container.scrollLeft += scrollAmount + 20;
      } else if (tagRect.left < containerRect.left) {
        const scrollAmount = containerRect.left - tagRect.left;
        container.scrollLeft -= scrollAmount + 20;
      }
    };

    container.addEventListener(
      "wheel",
      (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      },
      { passive: false },
    );

    let touchStartX = 0;
    let touchStartY = 0;

    container.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true },
    );

    container.addEventListener(
      "touchmove",
      (e) => {
        const touchCurrentX = e.touches[0].clientX;
        const touchCurrentY = e.touches[0].clientY;
        const diffX = touchStartX - touchCurrentX;
        const diffY = touchStartY - touchCurrentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          e.preventDefault();
          container.scrollLeft += diffX;
          touchStartX = touchCurrentX;
          touchStartY = touchCurrentY;
        }
      },
      { passive: false },
    );

    checkScrollable();
    scrollToActiveTag();
    window.addEventListener("resize", checkScrollable);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains("tag-item") && target.classList.contains("active")) {
            setTimeout(() => scrollToActiveTag(), 100);
          }
        }
      });
    });

    container.querySelectorAll<HTMLElement>(".tag-item").forEach((tag) => {
      observer.observe(tag, { attributes: true, attributeFilter: ["class"] });
    });
  });
}
