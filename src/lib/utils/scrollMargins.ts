export const updateScrollMargins = (headerSelector = '#siteHeader', targetSelector = '[data-scroll-mt]'): void => {
  const header = document.querySelector<HTMLElement>(headerSelector);
  const headerHeight = header?.offsetHeight ?? 0;

  const scrollTargets = document.querySelectorAll<HTMLElement>(targetSelector);
  scrollTargets.forEach((element) => {
    element.style.scrollMarginTop = `${headerHeight}px`;
  });
};
