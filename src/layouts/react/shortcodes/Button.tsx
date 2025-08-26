import type { JSX, ReactNode } from 'react';

interface ButtonProps {
  href: string;
  style?: string;
  rel?: string;
  children: ReactNode;
}

const Button = ({ href, style, rel, children }: ButtonProps): JSX.Element => {
  return (
    <a
      className={`btn me-4 mb-4 ${style === 'outline' ? 'btn-outline-primary' : 'btn-primary'} border-primary inline-flex items-center justify-center no-underline hover:text-white`}
      href={href}
      target="_blank"
      rel={`
        noopener noreferrer ${rel ? (rel === 'follow' ? '' : rel) : 'nofollow'}
      `}
    >
      {children}
    </a>
  );
};

export default Button;
