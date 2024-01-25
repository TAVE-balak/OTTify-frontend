import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import requests from "../../api/requests";
import { useDebounce } from "../../hooks/useDebounce";
import MovieModal from "../../components/MovieModal";
import "./SearchPage.css";
import search_off from "./search_off.png";

export default function SearchPage() {
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [movieCount, setMovieCount] = useState(0);
  const [tvCount, setTvCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("tv"); // 'all', 'movie', 'tv' 중 하나를 선택하는 상태, tv가 default

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const { data } = await axios.get(requests.fetchSearch, {
        params: { name: searchTerm },
      });
      setMovieCount(data.data.movieCount);
      setTvCount(data.data.tvCount);
      setTvResults(data.data.searchTvResponseDto.tvSearchInfos);
      setSelectedCategory(
        "tv"
      ); /* 새로운 검색어로 검색 시 TV 프로그램이 기본으로 보여지도록 설정 */
    } catch (error) {
      console.log("error", error);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const renderResultsSection = (selectedCategory) => {
    let results;
    switch (selectedCategory) {
      case "tv":
        results = tvResults;
        break;
      case "movie":
        results = movieResults;
        break;
      default:
    }

    if (results.length === 0) {
      return (
        <section className="no-results">
          <div className="search-term-container">
            <p>"{searchTerm}"의 검색결과</p>
          </div>
          <div className="no-results-container">
            <img className="search-off" src={search_off} alt="Search Off" />
            <p>검색결과가 없어요</p>
            <p>다시 한 번 검색해 주세요</p>
          </div>
        </section>
      );
    }

    return (
      <section className="search-results-section">
        <div className="search-term-container">
          <p>"{searchTerm}"의 검색결과</p>
        </div>
        <div className="search-results-container">
          {results.map((item) => (
            <div
              className={selectedCategory}
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <div className={`${selectedCategory}__column-poster`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.posterPath}`}
                  alt={item.title || item.name}
                  className={`${selectedCategory}__poster`}
                />
              </div>
              <div className={`${selectedCategory}__info`}>
                <p className={`${selectedCategory}__info-title`}>
                  {item.title}
                </p>
                <p className={`${selectedCategory}__info-createdDate`}>
                  {item.createdDate}
                </p>
                <p className={`${selectedCategory}__info-overview`}>
                  {item.overview.length > 250
                    ? item.overview.slice(0, 250) + "..."
                    : item.overview}{" "}
                  {/* 글자 수가 250이 넘을 경우 자르고 뒤에 ... 추가*/}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* 모달 렌더링 */}
        {modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
        )}
      </section>
    );
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    switch (category) {
      case "tv":
        try {
          const { data } = await axios.get(requests.fetchTv, {
            params: { name: searchTerm, page: 1 },
          });
          setTvResults(data.data.tvSearchInfos);
          setTvCount(data.data.totalResults);
        } catch (error) {
          console.log("tv 프로그램을 불러오지 못했습니다.", error);
        }
        break;
      case "movie":
        try {
          const { data } = await axios.get(requests.fetchMovie, {
            params: { name: searchTerm, page: 1 },
          });
          setMovieResults(data.data.movieSearchInfos);
          setMovieCount(data.data.totalResults);
        } catch (error) {
          console.log("영화를 불러오지 못했습니다.", error);
        }
        break;
      default:
        return;
    }
  };

  const renderCategoryButtons = () => {
    return (
      <div className="category-buttons">
        {/* <button onClick={() => handleCategoryClick("all")}>
          전체 ({movieCount + tvCount})
        </button> */}
        <button
          onClick={() => handleCategoryClick("tv")}
          className={selectedCategory === "tv" ? "active" : ""}
        >
          TV 프로그램 ({tvCount})
        </button>
        <button
          onClick={() => handleCategoryClick("movie")}
          className={selectedCategory === "movie" ? "active" : ""}
        >
          영화 ({movieCount})
        </button>
      </div>
    );
  };

  return (
    <div className="SearchPage">
      <div className="search-container">
        {renderCategoryButtons()}
        {renderResultsSection(selectedCategory)}
      </div>
    </div>
  );
}
