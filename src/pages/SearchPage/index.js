import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState({ movies: [], tv: [] });
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'movies', 'tv' 중 하나를 선택하는 상태

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
      const { data } = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      const filteredResults = data.results.reduce(
        (acc, result) => {
          if (result.backdrop_path) {
            if (result.media_type === "movie") {
              acc.movies.push(result);
            } else if (result.media_type === "tv") {
              acc.tv.push(result);
            }
          }
          return acc;
        },
        { movies: [], tv: [] }
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderResultsSection = (sectionTitle, results) => {
    return (
      <section className="search-results-section">
        <h2>{sectionTitle}</h2>
        <div className="search-container">
          {results.map((item) => (
            <div className="movie" key={item.id}>
              <div
                onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                className="movie__column-poster"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.title || item.name}
                  className="movie__poster"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const [movieCount, setMovieCount] = useState(0);
  const [tvCount, setTvCount] = useState(0);

  useEffect(() => {
    setMovieCount(searchResults.movies.length);
    setTvCount(searchResults.tv.length);
  }, [searchResults]);
  const renderCategoryButtons = () => {
    return (
      <div className="category-buttons">
        <button onClick={() => handleCategoryClick('all')}>
          전체 ({movieCount + tvCount})
        </button>
        <button onClick={() => handleCategoryClick('movies')}>
          영화 ({movieCount})
        </button>
        <button onClick={() => handleCategoryClick('tv')}>
          드라마 ({tvCount})
        </button>
      </div>
    );
  };

  const renderSearchResults = () => {
    const filteredResults = {
      movies: selectedCategory === 'all' || selectedCategory === 'movies' ? searchResults.movies : [],
      tv: selectedCategory === 'all' || selectedCategory === 'tv' ? searchResults.tv : [],
    };
    
    return (
      <div>
        {renderCategoryButtons()}
        {filteredResults.movies.length > 0 && renderResultsSection("영화", filteredResults.movies)}
        {filteredResults.tv.length > 0 && renderResultsSection("드라마", filteredResults.tv)}
        {(filteredResults.movies.length === 0 && filteredResults.tv.length === 0) && (
          <section className="no-results">
            <div className="no-results__text">
              <p>찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화 또는 드라마가 없습니다.</p>
            </div>
          </section>
        )}
      </div>
    );
  };

  return renderSearchResults();
}
