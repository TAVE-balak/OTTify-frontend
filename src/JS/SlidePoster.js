import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../CSS/SlidePoster.css'

import arrow from '../img/arrow.png';

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} type='button' id="nextBtn" className="sliderBtn">
    <img src={arrow} alt="Next" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} type='button' id="prevBtn" className="sliderBtn">
    <img src={arrow} alt="Prev" />
  </button>
);

const SlidePoster = ({data, type}) => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(data.length, 5),
    slidesToScroll: 1,
    nextArrow: <NextArrow/>, // 화살표 버튼을 커스텀해서 사용
		prevArrow: <PrevArrow/>,
    centerMode: false,
    variableWidth: true,
  });

  return (
    <div>
      <Slider {...sliderSettings}>
        {data.map((item, index) => (
          <div key = {index} className="sliderAll">
            <img src = {item.poster} className="poster_img" alt = {`Poster ${index + 1}`}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};


export default SlidePoster;