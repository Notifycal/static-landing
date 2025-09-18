declare global {
  interface Window {
    initializeCookieConsent: () => void;
    _htmlClassName: string;
  }
}

export {};
