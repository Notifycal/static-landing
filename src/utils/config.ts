import { productsInfoSchema } from '@notifycal/shared/pricing';
import { serviceConfigFactory } from '@notifycal/shared/utils';
import { z } from 'zod';

export const serviceConfigSchema = z.object({
  TIER_INFO: productsInfoSchema,
  FRONTEND_URL: z.url().default('https://notifycal.com'),
  GOOGLE_TAG_MANAGER_ID: z.string().optional(),
});

export type ServiceConfig = z.infer<typeof serviceConfigSchema>;

const { loadServiceConfig, getServiceConfig } = serviceConfigFactory(serviceConfigSchema);

export { getServiceConfig, loadServiceConfig };

