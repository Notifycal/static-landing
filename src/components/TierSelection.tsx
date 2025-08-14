import { Container, MantineProvider } from '@mantine/core';
import { TierSelection as TierSelectionReact } from '@notifycal/shared/components';
import { orderedTierInfoWithIcons } from '@notifycal/shared/pricing';
import type { LanguageCode } from '@notifycal/shared/types';
import type { JSX } from 'react';

interface TierSelection {
  locale: LanguageCode;
}

export function TierSelection({ locale }: TierSelection): JSX.Element {
  const tiers: Parameters<typeof orderedTierInfoWithIcons>[0] = {
    good: {
      name: 'Good Plan',
      credits: 100,
      priceEur: 10,
      priceId: 'good',
      productId: 'good',
      numberOfReminders: 100
    },
    better: {
      name: 'Better Plan',
      credits: 350,
      priceEur: 25,
      priceId: 'better',
      productId: 'better',
      numberOfReminders: 350
    },
    best: {
      name: 'Best Plan',
      credits: 1000,
      priceEur: 60,
      priceId: 'best',
      productId: 'best',
      numberOfReminders: 1000
    }
  };

  return (
    <MantineProvider>
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
