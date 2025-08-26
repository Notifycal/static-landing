import { useState, type JSX, type ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Accordion = ({ title, children, className }: AccordionProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={`border-border rounded border ${className}`}>
      <button
        className="bg-light text-text-dark relative block w-full px-4 py-3 text-left"
        onClick={() => {
          setShow(!show);
        }}
      >
        {title}
        <svg
          className={`absolute top-1/2 right-4 m-0 h-4 w-4 -translate-y-1/2 ${show && 'rotate-180'}`}
          viewBox="0 0 512.011 512.011"
          x="0px"
          xmlSpace="preserve"
          y="0px"
        >
          <path
            d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div className={`px-4 py-3 ${!show && 'hidden'}`}>{children}</div>
    </div>
  );
};

export default Accordion;
