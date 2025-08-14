import { marked } from 'marked';
import { useState, type JSX } from 'react';

interface FeatureTabItem {
  title: string;
  content: string;
  image: string;
}

interface FeatureTabData {
  title: string;
  list: Array<FeatureTabItem>;
}

interface FeatureTabProps {
  featureTab: FeatureTabData;
}

const FeatureTab = ({ featureTab }: FeatureTabProps): JSX.Element => {
  const [tab, setTab] = useState<number>(0);
  return (
    <div className="row mt-[120px] items-center">
      <div className="col-8 mx-auto mb-10 text-center">
        <h2
          dangerouslySetInnerHTML={{
            __html: marked.parseInline(featureTab.title)
          }}
        />
      </div>
      <div className="lg:col-6">
        {featureTab.list.map((item, index) => (
          <div key={`item-${index}`} className={`features-tab-panel ${tab === index ? 'active' : undefined} relative`}>
            <img alt={item.title} className="w-full object-contain" src={item.image} />
          </div>
        ))}
      </div>
      <div className="mt-6 lg:col-6 lg:mt-0">
        <div className="lg:max-w-[473px]">
          {featureTab.list.map((item, index) => (
            <div key={index} className={`features-tab-item ${tab === index ? 'active' : undefined} mt-9 first:mt-0`}>
              <h2
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(item.title)
                }}
                className="lg:text-2xl"
                onClick={() => {
                  setTab(index);
                }}
              />
              <p className="mt-4">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureTab;
