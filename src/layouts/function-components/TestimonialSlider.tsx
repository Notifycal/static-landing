import { useRef, type JSX } from 'react';
import { Star } from 'react-feather';
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
  rating: string;
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
              <h4 className="mb-2">{item.author}</h4>
              <p className="text-text-dark/80 mb-4">{item.organization}</p>
              <p>{item.content}</p>
              <div className={`review-rating mt-6 flex items-center justify-center space-x-2.5 ${item.rating}`}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
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
