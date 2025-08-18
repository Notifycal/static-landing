import type { ServiceConfig } from '@/utils/config';
import { useEffect, useState } from 'react';

export function useServiceConfig(): ServiceConfig | null {
  const [config, setConfig] = useState<ServiceConfig | null>(null);

  useEffect(() => {
    function handleConfigReady(event: CustomEvent<ServiceConfig>): void {
      setConfig(event.detail);
    }

    if (window.serviceConfig) {
      setConfig(window.serviceConfig);
    } else {
      window.addEventListener('serviceConfigReady', handleConfigReady as EventListener);
    }

    return (): void => {
      window.removeEventListener('serviceConfigReady', handleConfigReady as EventListener);
    };
  }, []);
  return config;
}

declare global {
  interface Window {
    serviceConfig: ServiceConfig;
  }
}