import { getServiceConfig, loadServiceConfig } from '@/utils/config';

declare global {
  interface Window {
    serviceConfig: ReturnType<typeof getServiceConfig>;
  }
}

function waitForGlobalConfig(callback: () => void, maxAttempts = 50): void {
  let attempts = 0;
  
  function check(): void {
    attempts++;
    if (window.globalConfig) {
      callback();
    } else if (attempts < maxAttempts) {
      setTimeout(check, 10);
    } else {
      console.error('Timeout waiting for window.globalConfig');
    }
  }
  
  check();
}

waitForGlobalConfig(() => {
  loadServiceConfig();
  window.serviceConfig = getServiceConfig();
  console.log('Service config processed:', window.serviceConfig);
  
  window.dispatchEvent(new CustomEvent('serviceConfigReady', { 
    detail: window.serviceConfig 
  }));
});