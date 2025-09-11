import { MantineProvider } from '@mantine/core';
import { TierSelection as TierSelectionReact } from '@notifycal/shared/components';
import { orderedTierInfoWithIcons } from '@notifycal/shared/pricing';
import type { LanguageCode } from '@notifycal/shared/types';
import type { JSX } from 'react';

import { useServiceConfig } from '@/hooks/useServiceConfig';
import { colors } from '@notifycal/shared/theme';

interface TierSelection {
  locale: LanguageCode;
}

export function TierSelection({ locale }: TierSelection): JSX.Element {
  const serviceConfig = useServiceConfig();
  if (!serviceConfig) {
    return <div>Loading...</div>;
  }
  const tiers = serviceConfig.TIER_INFO.tiers;
  const frontendUrl = serviceConfig.FRONTEND_URL;

  return (
    <MantineProvider
      theme={{
        primaryColor: 'primary',
        colors: colors
      }}
    >
      <TierSelectionReact
        isCardButtonDisabled={() => false}
        isCardButtonLoading={() => false}
        lang={locale}
        orderedTierInfoWithIcons={orderedTierInfoWithIcons(tiers, locale)}
        onTierSelection={() => {
          window.open(frontendUrl, '_blank');
          return Promise.resolve();
        }}
      />
    </MantineProvider>
  );
}
