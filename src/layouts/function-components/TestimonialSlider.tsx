import { useRef, type JSX } from 'react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface TestimonialItem {
  avatar: string;
  author: string;
  organization: string;
  content: string;
  badge: {
    type: 'clientSince' | 'businessType' | 'volume' | 'improvement' | 'feature';
    value: string;
  };
  reference?: string;
}

interface TestimonialSliderProps {
  list: Array<TestimonialItem>;
}

const TestimonialSlider = ({ list }: TestimonialSliderProps): JSX.Element => {
  SwiperCore.use([Pagination]);
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <div className="reviews-carousel relative">
      <Swiper
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
      >
        {list.map((item, index) => (
          <SwiperSlide key={'feature-' + index}>
            <div className="review">
              <div className="review-author-avatar bg-gradient">
                <img alt={item.author} src={item.avatar} />
              </div>
              <div className="review-content">
                <div>
                  <h4 className="mb-2">{item.author}</h4>
                  <p className="text-text-dark/80 mb-4">{item.organization}</p>
                  {item.reference && (
                    <p className="text-xs text-text-dark/60 mb-3">
                      {item.reference.startsWith('http') ? (
                        <a className="hover:text-primary" href={item.reference} rel="noopener noreferrer" target="_blank">
                          🌐 {item.reference.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      ) : (
                        <span>📍 {item.reference}</span>
                      )}
                    </p>
                  )}
                  <p className="mb-4">{item.content}</p>
                </div>
                <div className="review-badge flex items-center justify-center pb-4">
                  <span className={`badge badge-${item.badge.type} px-3 py-1 rounded-full text-sm font-medium`}>
                    {item.badge.value}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="testimonial-slider-pagination relative flex justify-center">
        <div
          ref={paginationRef}
          className="swiper-pagination reviews-carousel-pagination !bottom-0"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
