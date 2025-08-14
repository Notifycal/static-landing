import { humanize } from '@/lib/utils/textConverter';
import type { JSX } from 'react';
import * as Icon from 'react-feather';

interface FeatureItem {
  icon: string;
  title: string;
  content: string;
}

interface HomapageFeatureProps {
  featureList: Array<FeatureItem>;
}

const HomapageFeature = ({ featureList }: HomapageFeatureProps): JSX.Element => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {featureList.map((item, index) => {
        const FeatherIcon = Icon[humanize(item.icon) as keyof typeof Icon] as React.ComponentType;
        return (
          <div key={index} className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg">
            <div>
              <h3 className="h4 text-xl lg:text-2xl">{item.title}</h3>
              <p>{item.content}</p>
            </div>
            <span className="icon mt-4">
              <FeatherIcon />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HomapageFeature;
