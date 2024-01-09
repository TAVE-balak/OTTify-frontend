import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function DetailPage() {
  // URL 파라미터로부터 movieId 추출
  const { movieId } = useParams();

  // 영화 정보를 담을 상태와 초기화
  const [movie, setMovie] = useState({});

  // 해당 영화 정보를 가져오는 useEffect
  useEffect(() => {
    // 비동기 함수를 사용하여 영화 정보를 가져옴
    async function fetchData() {
      const request = await axios.get(`/movie/${movieId}`);
      // 가져온 정보를 상태에 업데이트
      setMovie(request.data);
    }
    // movieId가 변경될 때마다 useEffect가 실행됨
    fetchData();
  }, [movieId]);

  // movie가 없을 경우 로딩 중 표시
  if (!movie) return <div>...loading</div>;

  // 영화 정보가 있을 경우 해당 정보를 화면에 표시
  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  );
}
