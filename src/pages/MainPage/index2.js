import React, { useState, useEffect } from "react";
import Row from "../../components/Row";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "../../CSS/MainPage.css";
import star from "../../components/MovieModal/star.png";
import poster from "../MainPage/poster.jpg";
import arrowRight from "./arrow_right.png";

const MainPage = () => {
  const likeData = [
    { poster: poster },
    { poster: poster },
    { poster: poster },
    { poster: poster },
    { poster: poster },
    { poster: poster },

    // Add other poster objects here
  ];
  // 클릭 상태 및 컬러 인덱스를 다루는 상태 값
  const [clickedButtons, setClickedButtons] = useState(
    Array(likeData.length).fill(false)
  );
  const [colorIndex, setColorIndex] = useState(0);

  // 버튼 클릭 처리
  const handleButtonClick = (index) => {
    const newClickedButtons = [...clickedButtons]; // 이전 클릭 상태 복사
    newClickedButtons[index] = !newClickedButtons[index]; // 클릭된 버튼 상태 변경
    setClickedButtons(newClickedButtons); // 변경된 클릭 상태 적용
  };

  // Rendering only first 6 items from likeData
  const displayedLikeData = likeData.slice(0, 6);


  // 1초마다 컬러 인덱스 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % 10);
    }, 1000); // Change color every second

    return () => clearInterval(interval);
  }, []);
  // 리뷰에 대한 컬러 스타일 배열
  const colorStyles = [
    { color: "#000" },
    { color: "#333" },
    { color: "#666" },
    { color: "#999" },
    { color: "#BBB" },
    { color: "#DDD" },
    { color: "#EEE" },
    { color: "#888" },
    { color: "#555" },
    { color: "#222" },
  ];

  const [reviews, setReviews] = useState([]);
  // Initialize likes count state where each review starts with 0 likes
  const [likes, setLikes] = useState(reviews.map(() => 0));

  // 리뷰 데이터 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/main/latestReviews");
      setReviews(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="MainPage">
      <div className="ranking">
        <Row
          title="인기차트"
          id="TR"
          fetchUrl={requests.fetchTrending}
          // isLargeRow="false"
          type="week"
          slideNum="4"
        />
      </div>

      <div className="today-trend">
        <Row
          title="오늘 트렌드"
          id="NO"
          fetchUrl={requests.fetchTrending}
          type="day"
          slideNum="2" // You may need to adjust your Row component to handle this prop inside Swiper
        />
      </div>


      <div className="reviews-container">
        <h2 className="new_reviews">
          최신 리뷰 한줄평{" "}
          <img
            className="arrow-right"
            src={arrowRight} // 수정된 부분: 프로필 사진 속성을 사용
            alt="Arrow Right"
          />
        </h2>
        <Swiper
          spaceBetween={10} // 슬라이드 간 간격
          slidesPerView={4} // 한 번에 보을 슬라이드 수
          navigation // 네비게이션 화살표 사용
          pagination={{ clickable: true }} // 페이지 표시기 사용
          scrollbar={{ draggable: true }} // 스크롤바로 슬라이드를 넘길 수 있게 설정
          style={{ padding: "0 30px" }} // 패딩 추가
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="review-container">
                <div className="review-reviewer-info">
                  <img
                    className="user-profile-img"
                    src={review.profilePhoto}
                    alt="Profile Photo"
                  />
                  {review.nickName || ""}님의 평가{" "}
                  <span className="review-rating">
                    <img className="rating-star" src={star} alt="Rating Star" />
                    {review.reviewRating || ""}
                  </span>
                </div>
                <span className="review-reviewer-content">
                  <p className="review-program-title">
                    {review.programTitle || ""}
                  </p>
                  <p className="review-content">{review.content}</p>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 추가: '당신의 인생작이 될 수도 있어요!' 제목 */}

      <div className="program-of-lifetime">
        <h2>
          당신의 인생작이 될 수도 있어요!{" "}
          <span style={{ fontSize: "smaller", color: "lightgrey" }}>
            *추천 기준은 찜(50%), 별점(50%) 기준으로 산정됩니다.{" "}
          </span>
        </h2>
        <p style={{ fontSize: "smaller", color: "lightgrey" }}>
    로그인 하시면 제공되는 기능입니다.
  </p>
      </div>
    </div>
  );
};
export default MainPage;
