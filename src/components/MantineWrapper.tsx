import { MantineProvider } from '@mantine/core';
import { TestCard } from '@notifycal/shared/components';

interface MantineWrapperProps {
  title: string;
  locale: string;
  onButtonClick: () => void;
}

export function MantineWrapper({ title, locale, onButtonClick }: MantineWrapperProps) {
  return (
    <MantineProvider>
      <TestCard 
        title={title}
        onButtonClick={onButtonClick}
        locale={locale}
      />
    </MantineProvider>
  );
}