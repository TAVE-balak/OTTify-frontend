const requests = {
  fetchNowPlaying: "movie/now_playing",
  fetchNetflixOriginals: "/discover/tv?with_networks=213",
  fetchTrending: "/trending/all/week",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
  fetchTrending: "/api/v1/program/trending",
  fetchSearch: "/api/v1/program/search",
  fetchTv: "/api/v1/tv/search",
  fetchMovie: "/api/v1/movie/search",
  fetchSaveSignUpInfo: "/api/v1/oauth/info",
};

export default requests;
