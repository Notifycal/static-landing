import { humanize } from '@/lib/utils/textConverter';
import { useState, type JSX } from 'react';
import * as Icon from 'react-feather';

interface TabItem {
  icon: string;
  title: string;
  image: string;
}

interface FeaturesTabData {
  title: string;
  description: string;
  tabList?: Array<TabItem>;
}

interface FeaturesTabProps {
  featuresTab: FeaturesTabData;
}

const FeaturesTab = ({ featuresTab }: FeaturesTabProps): JSX.Element => {
  const { title, description, tabList } = featuresTab;

  const [tab, setTab] = useState<number>(0);
  return (
    <div className="tab gx-5 row items-center">
      <div className="lg:order-2 lg:col-7">
        <div className="tab-content">
          {tabList?.map((item, index) => (
            <div key={index} className={`${clsx({ 'tab-content-panel': true, active: tab === index })}`}>
              <img alt="" className="w-full object-contain" src={item.image} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 lg:order-1 lg:col-5 lg:mt-0">
        <div className="text-container">
          <h2 className="lg:text-4xl">{title}</h2>
          <p className="mt-4">{description}</p>
          <ul className="tab-nav mt-8! border-b-0">
            {tabList?.map((item, index) => {
              const FeatherIcon = Icon[humanize(item.icon) as keyof typeof Icon];
              return (
                <li
                  key={index}
                  className={`${clsx({ 'tab-nav-item': true, active: tab === index })}`}
                  onClick={() => {
                    setTab(index);
                  }}
                >
                  <span className="tab-icon mr-3">
                    <FeatherIcon />
                  </span>
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FeaturesTab;
