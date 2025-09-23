export const updateActiveAnchorLinks = (): void => {
  const allLinks = document.querySelectorAll<HTMLAnchorElement>('.navbar a.nav-link');

  const anchorLinks: Array<HTMLAnchorElement> = Array.from(allLinks).filter((link) => {
    const href = link.getAttribute('href');
    return href && href.includes('#');
  });

  const sectionLinkMap = new Map<HTMLElement, HTMLAnchorElement>();
  anchorLinks.forEach((link) => {
    const href = link.getAttribute('href')!;
    const id = href.split('#')[1];
    if (id) {
      const section = document.getElementById(id);
      if (section) {
        sectionLinkMap.set(section, link);
      }
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = sectionLinkMap.get(entry.target as HTMLElement);
        if (!link) return;

        if (entry.isIntersecting) {
          allLinks.forEach((l) => {
            l.classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    },
    {
      rootMargin: '-30% 0px -70% 0px', // active when it's more or less in the middle of the screen
      threshold: 0
    }
  );

  sectionLinkMap.forEach((_, section) => {
    observer.observe(section);
  });
};
