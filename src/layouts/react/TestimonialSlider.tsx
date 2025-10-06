import { useRef, useState, type FC } from 'react';
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MdLocationPin } from 'react-icons/md';
import { TbExternalLink } from 'react-icons/tb';

interface TestimonialItem {
  avatar: string;
  author: string;
  organization: string;
  content: string;
  badge: {
    type: 'clientSince' | 'businessType' | 'volume' | 'improvement' | 'feature';
    value: string;
  };
  reference?: {
    displayName: string;
    link?: string;
  };
}

interface TestimonialSliderProps {
  list: Array<TestimonialItem>;
}

const TestimonialCard: FC<TestimonialItem> = (item) => (
  <div className="review">
    <div className="review-author-avatar bg-gradient">
      <img alt={item.author} className="rounded-full" src={item.avatar} />
    </div>
    <div className="flex flex-col">
      <h4 className="mb-2">{item.author}</h4>
      <p className="text-text-dark/80 mb-4">{item.organization}</p>
      {item.reference && (
        <p className="text-text-dark/60 mb-3 text-xs">
          {item.reference && item.reference.link ? (
            <a className="hover:text-primary-800" href={item.reference.link} rel="noopener noreferrer" target="_blank">
              <span className="flex items-center justify-center gap-1">
                <TbExternalLink className="text-base text-blue-400" />
                {item.reference.displayName}
              </span>
            </a>
          ) : (
            <span className="flex items-center justify-center gap-1">
              <MdLocationPin className="text-base text-red-400" />
              {item.reference.displayName}
            </span>
          )}
        </p>
      )}
      <p className="mb-4">{item.content}</p>

      <div className="review-badge">
        <span className="badge">{item.badge.value}</span>
      </div>
    </div>
  </div>
);

const TestimonialSlider: FC<TestimonialSliderProps> = ({ list }) => {
  SwiperCore.use([Autoplay, Pagination]);
  const [, setSwiper] = useState<SwiperCore | null>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <div className="testimonial-slider">
      <Swiper
        loop
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          992: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          }
        }}
        pagination={{
          type: 'bullets',
          el: paginationRef.current,
          clickable: true,
          dynamicBullets: true
        }}
        onBeforeInit={(swiper) => {
          setSwiper(swiper);
        }}
      >
        {list.map((item, index) => (
          <SwiperSlide key={'testimonial-' + index}>
            <TestimonialCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="testimonial-slider-pagination">
        <div ref={paginationRef} className="swiper-pagination !bottom-0" style={{ width: '100%' }}></div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
