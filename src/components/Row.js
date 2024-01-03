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
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };

    fetchData();
  }, [fetchUrl]);

  // // 영화 데이터를 가져오고 상태 업데이트
  // const fetchMovieData = async () => {
  //   const request = await axios.get(fetchUrl);
  //   console.log("request", request);
  //   setMovies(request.data.results);
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
          {movies && movies.map((movie, index) => (
            <SwiperSlide key={movie.id}>
              <div className="row__posterContainer">
                {/* 포스터 위에 순위 표시 */}
                <div className="row__posterRank">{index + 1}</div> 
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
                  <div className="row__details">
              <h3>{movie.title}</h3>
              <p>평점: {movie.vote_average}</p>
              <p>장르: {movie.genres && movie.genres.map(genre => genre.name).join(", ")}</p>
              <p>개봉년도: {movie.release_date}</p>
            </div>
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
