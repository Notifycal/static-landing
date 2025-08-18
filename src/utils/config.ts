import { productsInfoSchema } from '@notifycal/shared/pricing';
import { serviceConfigFactory } from '@notifycal/shared/utils';
import { z } from 'zod';

export const serviceConfigSchema = z.object({
  TIER_INFO: productsInfoSchema,
  FRONTEND_URL: z.string().url().default('https://notifycal.com'),
  GOOGLE_CLIENT_ID: z.string().optional(),
});

export type ServiceConfig = z.infer<typeof serviceConfigSchema>;

// Use the factory from shared utils
const { loadServiceConfig, getServiceConfig } = serviceConfigFactory(serviceConfigSchema);

export { loadServiceConfig, getServiceConfig };

