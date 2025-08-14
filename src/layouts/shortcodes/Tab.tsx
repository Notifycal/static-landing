import type { JSX, ReactNode } from 'react';

interface TabProps {
  name: string;
  children: ReactNode;
}

const Tab = ({ name, children }: TabProps): JSX.Element => {
  return <div data-name={name}>{children}</div>;
};

export default Tab;
