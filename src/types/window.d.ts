declare global {
  interface Window {
    initializeCookieConsent: () => void;
    reinitializeCookieConsent: () => void;
  }
}

export {};