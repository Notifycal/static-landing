import { humanize } from '@/lib/utils/textConverter';
import type { JSX } from 'react';
import * as Icon from 'react-feather';
import { BsPinAngleFill } from 'react-icons/bs';

interface Button {
  label: string;
  link: string;
}

interface Services {
  title: string;
  list: Array<string>;
}

interface PricingItem {
  title: string;
  icon: string;
  preCurrency: string;
  price: number;
  postCurrency: string;
  featured?: boolean;
  description: string;
  services: Services;
  buttons: {
    buyNow: Button;
    freeTrial: Button;
  };
}

interface PricingCardProps {
  item: PricingItem;
}

const PricingCard = ({ item }: PricingCardProps): JSX.Element => {
  const FeatherIcon = Icon[humanize(item.icon) as keyof typeof Icon] as React.ComponentType<{
    className?: string;
  }>;
  return (
    <div key={item.title} className="mt-8 px-3 md:col-6 lg:col-4 lg:mt-0">
      <div
        className={`rounded-xl bg-white px-8 py-10 shadow-lg ${
          item.featured ? 'border-primary -mt-16 border' : undefined
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="h3">{item.title}</h2>
            <p className="text-text-dark mt-3 text-2xl">
              {item.preCurrency} {item.price}.00 {item.postCurrency}
            </p>
          </div>
          <span
            className={`inline-flex h-16 w-16 items-center justify-center rounded-full font-bold ${
              item.featured ? 'bg-gradient text-white' : 'bg-light text-text-dark'
            }`}
          >
            <FeatherIcon className="font-semibold" />
          </span>
        </div>
        <p className="mt-6">{item.description}</p>
        <div className="border-border my-6 border-y py-6">
          <h4 className="h6">{item.services.title}</h4>

          <ul className="mt-6">
            {item.services.list.map((service, index) => (
              <li key={`service-${index}`} className="mb-3 text-sm">
                <span className="mr-2">
                  <BsPinAngleFill
                    className={`mr-1 inline h-[14px] w-[14px] ${item.featured ? 'text-primary' : undefined}`}
                  />
                </span>
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <a
            href={item.buttons.buyNow.link}
            className={`btn ${
              item.featured ? 'btn-primary' : 'btn-outline-white'
            } block h-[48px] w-full rounded-[50px] leading-[30px]`}
          >
            {item.buttons.buyNow.label}
          </a>
          <a className="text-text-dark mt-6 inline-flex items-center" href={item.buttons.freeTrial.link}>
            {item.buttons.freeTrial.label}
            <svg
              className="ml-1.5"
              fill="none"
              height="16"
              viewBox="0 0 13 16"
              width="13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289L6.34315 0.928932C5.95262 0.538408 5.31946 0.538408 4.92893 0.928932C4.53841 1.31946 4.53841 1.95262 4.92893 2.34315L10.5858 8L4.92893 13.6569C4.53841 14.0474 4.53841 14.6805 4.92893 15.0711C5.31946 15.4616 5.95262 15.4616 6.34315 15.0711L12.7071 8.70711ZM0 9H12V7H0V9Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
