import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './Casts.css';
const Casts = ({ castList }) => {
  return (
    <Swiper
      modules={[Navigation, Scrollbar]}
      spaceBetween={10}
      slidesPerView={'auto'}
      navigation
      scrollbar={{ draggable: true }}
    >
      {castList.map((castMember, index) => (
        <SwiperSlide key={index} style={{ width: 'auto', flexShrink: 0 }}>
          <div className="cast-member">
            <img
              src={`https://image.tmdb.org/t/p/w200/${castMember.profile_path}`}
              alt={`${castMember.name} as ${castMember.character}`}
              className="cast-member__image"
            />
            <div className="cast-member__info">
              <h4 className="cast-member__name">{castMember.name}</h4>
              <p className="cast-member__known_for_department">
                {castMember.known_for_department}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Casts;
