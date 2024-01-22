import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import star from "./MovieModal/star.png";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({
  // isLargeRow,
  title,
  id,
  fetchUrl,
  type,
  slideNum,
}) {
  // State 선언
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  // 영화 데이터 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      if (type === "week") {
        setMovies(response.data.data.programTrendingWeekInfos);
      } else if (type === "day") {
        setMovies(response.data.data.programTrendingDayInfos);
      }
    };
    fetchData();
  }, [fetchUrl]);

  // 영화 데이터를 가져오고 상태 업데이트
  // const fetchMovieData = async () => {
  //   const request = await axios.get(fetchUrl);
  //   console.log("request", request);
  //   setMovies(request.data.results.slice(0, 2)); // 첫 두 항목만 가져오기
  // };

  // 영화 포스터 클릭 시 모달을 열고 선택한 영화 정보 설정
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      {/* Swiper 컴포넌트 */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={true}
        // breakpoints={{
        //   1378: {
        //     slidesPerView: 6,
        //     slidesPerGroup: 6,
        //   },
        //   998: {
        //     slidesPerView: 5,
        //     slidesPerGroup: 5,
        //   },
        //   625: {
        //     slidesPerView: 4,
        //     slidesPerGroup: 4,
        //   },
        //   0: {
        //     slidesPerView: 3,
        //     slidesPerGroup: 3,
        //   },
        // }}
        navigation
        // pagination={{ clickable: true }}
        slidesPerView={slideNum} // 한 번에 보일 슬라이드 수
        spaceBetween={type === "day" ? 15 : undefined}
        autoplay={{
          delay: 1500, // Delay of 3 seconds for each slide
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
      >
        <div id={id} className="row__posters">
          {/* SwiperSlide로 각 영화 포스터 렌더링 */}
          {movies &&
            movies.map((movie, index) => (
              <SwiperSlide key={movie.id || index}>
                <div className="row__posterContainer">
                  {/* 포스터 위에 순위 표시 */}
                  <div className="row__posterRank">{index + 1}</div>
                  <img
                    className={`row__poster ${type && "row__posterLarge"}`}
                    src={`https://image.tmdb.org/t/p/original/${
                      type === "week" ? movie.posterPath : movie.backDropPath
                    }`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                    style={{ borderRadius: "20px" }}
                  />
                  <div
                    className="row__details"
                    // style={{ marginLeft: type === "day" ? "5px" : "5px" }}
                  >
                    <p>{movie.title}</p>
                    <div className="movie-info">
                      <p className="info-createdYear">
                        {movie.createdYear} · {movie.genreName}
                      </p>
                      <span className="info-rating">
                        <img
                          className="rating-star"
                          src={star}
                          alt="Rating Star"
                        />
                        {movie.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>

      {/* 모달 렌더링 */}
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
