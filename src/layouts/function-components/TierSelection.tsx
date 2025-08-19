import { Container, MantineProvider } from '@mantine/core';
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

  return (
    <MantineProvider
      theme={{
        primaryColor: 'primary',
        colors: colors
      }}
    >
      <Container>
        <TierSelectionReact
          isCardButtonDisabled={() => false}
          isCardButtonLoading={() => false}
          lang={locale}
          orderedTierInfoWithIcons={orderedTierInfoWithIcons(tiers, locale)}
          onTierSelection={(tierId) => {
            console.log(`User clicked on tier ${tierId}`);
            window.open('https://privatedev.notifycal.com', '_blank');
            return Promise.resolve();
          }}
        />
      </Container>
    </MantineProvider>
  );
}
