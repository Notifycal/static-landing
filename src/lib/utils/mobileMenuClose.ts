export const closeMobileMenu = (): void => {
  const mobileMenuToggleElement = document.querySelector<HTMLInputElement>('#nav-toggle');
  if (mobileMenuToggleElement && mobileMenuToggleElement.checked) {
    mobileMenuToggleElement.checked = false;
  }
};
