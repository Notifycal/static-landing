import { productsInfoSchema } from '@notifycal/shared/pricing';
import { serviceConfigFactory } from '@notifycal/shared/utils';
import { z } from 'zod';

export const serviceConfigSchema = z.object({
  TIER_INFO: productsInfoSchema,
  FRONTEND_URL: z.url().default('https://notifycal.com'),
  GOOGLE_TAG_MANAGER_ID: z.string()
});

export type ServiceConfig = z.infer<typeof serviceConfigSchema>;

const { loadServiceConfig, getServiceConfig } = serviceConfigFactory(serviceConfigSchema);

declare global {
  interface Window {
    serviceConfig: ServiceConfig;
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

  window.dispatchEvent(
    new CustomEvent('serviceConfigReady', {
      detail: window.serviceConfig
    })
  );
});
