import { markdownify } from '@/lib/utils/textConverter';
import type { JSX, ReactNode } from 'react';

interface ContentBlockProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  buttonLink?: string;
  image: string;
  order?: string;
  children: ReactNode;
}

const ContentBlock = ({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  image,
  order,
  children
}: ContentBlockProps): JSX.Element => {
  return (
    <div className="section">
      <div className="container">
        <div className="row items-center justify-center">
          <div className={`lg:col-5 ${order === 'right' ? 'order-1' : 'order-1 lg:order-0'}`}>
            <div className="section-title text-left">
              <p className="mb-4 text-[0.9rem] uppercase">{markdownify(subtitle)}</p>
              <h2 className="service-title">{markdownify(title)}</h2>
              <p className="text-text text-[.9rem]">{children}</p>
            </div>
            {buttonLabel && (
              <a className="btn btn-primary" href={buttonLink}>
                {buttonLabel}
              </a>
            )}
          </div>
          <div className={`mb-6 lg:col-5 lg:mt-0 lg:mb-0 ${order === 'right' ? 'order-0' : 'order-0 lg:order-1'}`}>
            <img alt={title} className="h-auto w-full max-w-full" height={320} src={image} width={527} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBlock;
