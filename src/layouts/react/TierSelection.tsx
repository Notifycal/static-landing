import { MantineProvider } from '@mantine/core';
import {
  PricingCalculator as PricingCalculatorReact,
  TierSelection as TierSelectionReact
} from '@notifycal/shared/components';
import { orderedTierInfoWithIcons } from '@notifycal/shared/pricing';
import type { LanguageCode, TierId } from '@notifycal/shared/types';
import { useState, type JSX } from 'react';

import { useServiceConfig } from '@/hooks/useServiceConfig';
import { colors } from '@notifycal/shared/theme';

interface TierSelection {
  locale: LanguageCode;
}

export function TierSelection({ locale }: TierSelection): JSX.Element {
  const [recommendedTier, setTierRecommended] = useState<{ tierId: TierId; trigger: number } | undefined>(undefined);

  const serviceConfig = useServiceConfig();
  if (!serviceConfig) {
    return <div>Loading...</div>;
  }
  const tiers = serviceConfig.TIER_INFO.tiers;
  const frontendUrl = serviceConfig.FRONTEND_URL;

  const onTierSelected = (): Promise<void> => {
    window.open(frontendUrl, '_blank');
    return Promise.resolve();
  };

  const translatedOrderedTierInfoWithIcons = orderedTierInfoWithIcons(tiers, locale);
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
        orderedTierInfoWithIcons={translatedOrderedTierInfoWithIcons}
        recommendedTier={recommendedTier}
        onTierSelection={onTierSelected}
      />
      <div className="mt-20">
        <PricingCalculatorReact
          collapsible
          defaultExpanded
          contactUrl={`${frontendUrl}/#/onboarding/feedback`}
          isSelectButtonLoading={false}
          orderedTierInfoWithIcons={translatedOrderedTierInfoWithIcons}
          onTierRecommendation={setTierRecommended}
          onTierSelect={onTierSelected}
        />
      </div>
    </MantineProvider>
  );
}
