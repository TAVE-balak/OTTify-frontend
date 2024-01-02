import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Swiper 스타일 import
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  // State 선언
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  // 영화 데이터 가져오는 함수
  useEffect(() => {
    fetchMovieData();
  }, []);

  // 영화 데이터를 가져오고 상태 업데이트
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
  };

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
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        <div id={id} className="row__posters">
          {/* SwiperSlide로 각 영화 포스터 렌더링 */}
          {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
        <div>
          <img
            style={{ padding: "25px 0" }}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`https://image.tmdb.org/t/p/original/${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          />
          <h3>{movie.title}</h3> {/* 영화 제목 추가 */}
          <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99994 14.5996L13.4583 16.6913C14.0916 17.0746 14.8666 16.508 14.6999 15.7913L13.7833 11.858L16.8416 9.20798C17.3999 8.72464 17.0999 7.80798 16.3666 7.74964L12.3416 7.40798L10.7666 3.69131C10.4833 3.01631 9.51661 3.01631 9.23327 3.69131L7.65827 7.39964L3.63327 7.74131C2.89994 7.79964 2.59994 8.71631 3.15827 9.19964L6.21661 11.8496L5.29994 15.783C5.13327 16.4996 5.90827 17.0663 6.5416 16.683L9.99994 14.5996Z" fill="#FD7E14"/>
          </svg>평균 평점: {movie.vote_average}</p> {/* 평점 추가 */}
          <p>개봉 날짜: {movie.release_date}</p> {/* 개봉 날짜 추가 */}
          <p>장르: {movie.genre}</p> {/* 장르 추가 */}
        </div>
      </SwiperSlide>
      
         
          ))}
        </div>
      </Swiper>

      {/* 모달 렌더링 */}
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
