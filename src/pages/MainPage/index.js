import React, { useState, useEffect } from "react";
import Row from "../../components/Row";
import requests from "../../api/requests";
import axios from "../../api/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "../../CSS/MainPage.css";
import star from "../../components/MovieModal/star.png";
import lilju from "../MainPage/lilju.png";
import poster from "../MainPage/poster.jpg";
import sweethome from "../MainPage/sweethome.png";
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

  // 트렌딩 아이템 배열
  // const trendingItems = [
  //   {
  //     title: "스위트 홈 시즌 2",
  //     posterUrl: sweethome, // Use the imported image here
  //     releaseYear: 2022, // Add the release year
  //     rating: "4.5/5",
  //     isMovie: true,
  //   },
  //   {
  //     title: "태어난 김에 세계일주 3",
  //     posterUrl: lilju, // 실제 이미지 경로로 변경해야 함
  //     releaseYear: 2023, // Add the release year
  //     rating: "3.8/5",
  //     isMovie: true,
  //   },
  //   // 다른 트렌딩 영화들...
  // ];

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
      console.log(1, response.data.data);
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
        <Swiper
          modules={[Autoplay]} // Add the Autoplay module
          // Set the space between slides and number of slides per view
          spaceBetween={50} // Adjust as needed
          slidesPerView={1} // Set to 1 since you are displaying one row per slide
          autoplay={{
            delay: 3000, // Delay of 3 seconds for each slide
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          loop={true} // Enable continuous loop mode
          // Additional configurations for pagination, navigation, etc.
        >
          <SwiperSlide>
            <Row
              title="오늘 트렌드"
              id="NO"
              fetchUrl={requests.fetchTrending}
              type="day"
              slideNum="2" // You may need to adjust your Row component to handle this prop inside Swiper
            />
          </SwiperSlide>
          {/* Add additional SwiperSlides if needed */}
        </Swiper>
      </div>

      {/* <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500, // 3.5초 간격으로 자동 슬라이드 변경
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 계속
          }}
        >
          <SwiperSlide> */}
      {/* {trendingItems.map((item, index) => (
    <SwiperSlide key={index}>
      <img
        src={item.posterUrl}
        alt={item.title}
        style={{ width: '300px', height: '150px' }}
      />
    <strong>{`${index + 1}. ${item.title}`}</strong>
      <br />
      {`개봉년도: ${item.releaseYear}`} 
      <br />
      {`평점: ${item.rating}`}
      <br />
      {item.isMovie ? '영화' : '드라마'} */}
      {/* <Row
              title="오늘 트렌드"
              id="NO"
              fetchUrl={requests.fetchTrending}
              isLargeRow
              type="day"
            />
          </SwiperSlide>
        </Swiper> */}

      {/* Movie titles */}
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
          <ol style={{ listStyleType: "none", padding: 0 }}>
            {trendingItems.map((item, index) => (
              <li
                key={index}
                style={colorStyles[(colorIndex + index) % 10]}
              ></li>
            ))}
          </ol>
        </div>
      </div> */}

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
                    {review.userRating || ""}
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
        {/* Displaying only first 6 posters */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {displayedLikeData.map((item, index) => (
            <div key={index} style={{ margin: "10px", width: "30%" }}>
              <img
                src={item.poster}
                alt={`poster-${index}`}
                style={{ width: "100%", height: "auto" }}
              />
              <button
                onClick={() => handleButtonClick(index)}
                style={{
                  marginTop: "5px",
                  backgroundColor: clickedButtons[index]
                    ? "green"
                    : "var(--Primary-Primary, var(--primary, #FD7E14))",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                {clickedButtons[index] ? "클릭됨!" : "찜하기"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
