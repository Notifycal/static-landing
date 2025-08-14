import type { JSX, ReactNode } from 'react';

interface BadgeProps {
  type: string;
  children: ReactNode;
}

const Badge = ({ type, children }: BadgeProps): JSX.Element => {
  return <span className={`badge ${type}`}>{children}</span>;
};

export default Badge;
