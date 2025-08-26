import type { JSX, ReactNode } from 'react';

interface BlockquoteProps {
  name: string;
  children: ReactNode;
}

const Blockquote = ({ name, children }: BlockquoteProps): JSX.Element => {
  return (
    <div className="blockquote my-10 rounded-xl bg-white px-16 py-8 lg:px-20">
      <blockquote className="text-text-dark text-2xl">{children}</blockquote>
      <p className="mt-4 mb-0">{name}</p>
    </div>
  );
};

export default Blockquote;
