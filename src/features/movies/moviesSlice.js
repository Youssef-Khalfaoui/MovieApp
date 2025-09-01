import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Use environment variable for API key - fallback for demo purposes
const API_KEY =
  process.env.REACT_APP_TMDB_API_KEY || "7a462e4b142a990b15c01fe69d2b2de9";
const BASE_URL = "https://api.themoviedb.org/3";

// Helper function to get provider IDs
const PROVIDERS = {
  NETFLIX: 8,
  DISNEY_PLUS: 337,
  AMAZON_PRIME: 119,
  HBO_MAX: 384,
  APPLE_TV: 350,
};

// Helper function for API calls with error handling
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
};

// Async thunks for different types of content
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);
export const searchMulti = createAsyncThunk(
  "movies/searchMulti",
  async ({ query, page = 1 }) => {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    return response.json();
  }
);
export const fetchLatestFrenchContent = createAsyncThunk(
  "movies/fetchLatestFrenchContent",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=fr&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchTrendingTVShows = createAsyncThunk(
  "movies/fetchTrendingTVShows",
  async (page = 1) => {
    const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchUpcomingTVShows = createAsyncThunk(
  "movies/fetchUpcomingTVShows",
  async (page = 1) => {
    const url = `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchAnime = createAsyncThunk(
  "movies/fetchAnime",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchTVShows = createAsyncThunk(
  "movies/fetchTVShows",
  async (page = 1) => {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Fixed missing fetchAllTVShows thunk
export const fetchAllTVShows = createAsyncThunk(
  "movies/fetchAllTVShows",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// NEW: Animation-specific thunks
export const fetchAnimatedMovies = createAsyncThunk(
  "movies/fetchAnimatedMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchAnimatedTVShows = createAsyncThunk(
  "movies/fetchAnimatedTVShows",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchAnimeMovies = createAsyncThunk(
  "movies/fetchAnimeMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchAnimeTV = createAsyncThunk(
  "movies/fetchAnimeTV",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchWesternCartoons = createAsyncThunk(
  "movies/fetchWesternCartoons",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&without_companies=19398&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchJapaneseAnime = createAsyncThunk(
  "movies/fetchJapaneseAnime",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Enhanced Arabic content
export const fetchArabicContent = createAsyncThunk(
  "movies/fetchArabicContent",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ar&region=EG&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchLatestArabicTV = createAsyncThunk(
  "movies/fetchLatestArabicTV",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ar&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchPopularArabic = createAsyncThunk(
  "movies/fetchPopularArabic",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ar&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Ramadan Content
export const fetchRamadanContent = createAsyncThunk(
  "movies/fetchRamadanContent",
  async ({ page = 1, year = 2025 }) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ar&first_air_date_year=${year}&with_keywords=ramadan,arabic-tv-series&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchFrenchContent = createAsyncThunk(
  "movies/fetchFrenchContent",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=fr&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchTurkishContent = createAsyncThunk(
  "movies/fetchTurkishContent",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=tr&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Turkish drama and content thunks
export const fetchTurkishDrama = createAsyncThunk(
  "movies/fetchTurkishDrama",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=tr&with_genres=18&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchLatestTurkishMovies = createAsyncThunk(
  "movies/fetchLatestTurkishMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=tr&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchNewestTurkishTV = createAsyncThunk(
  "movies/fetchNewestTurkishTV",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=tr&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchPopularTurkish = createAsyncThunk(
  "movies/fetchPopularTurkish",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=tr&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// K-Drama (Korean Drama)
export const fetchKDrama = createAsyncThunk(
  "movies/fetchKDrama",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=ko&with_genres=18&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// C-Drama (Chinese Drama)
export const fetchCDrama = createAsyncThunk(
  "movies/fetchCDrama",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=zh&with_genres=18&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Indian Movies
export const fetchIndianMovies = createAsyncThunk(
  "movies/fetchIndianMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Marvel Movies
export const fetchMarvelMovies = createAsyncThunk(
  "movies/fetchMarvelMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=420|19551|38679&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Football/Sports streaming content
export const fetchFootballMatches = createAsyncThunk(
  "movies/fetchFootballMatches",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10770&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchSportsDocumentaries = createAsyncThunk(
  "movies/fetchSportsDocumentaries",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&with_keywords=180&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchLiveSports = createAsyncThunk(
  "movies/fetchLiveSports",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10767&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchGenres = createAsyncThunk("movies/fetchGenres", async () => {
  const [movieGenres, tvGenres] = await Promise.all([
    fetchWithErrorHandling(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`),
    fetchWithErrorHandling(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`),
  ]);
  return { movie: movieGenres.genres, tv: tvGenres.genres };
});

export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchMoviesByGenre",
  async ({ genreId, page = 1 }) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchTVShowsByGenre = createAsyncThunk(
  "movies/fetchTVShowsByGenre",
  async ({ genreId, page = 1 }) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const searchContent = createAsyncThunk(
  "movies/searchContent",
  async ({ query, page = 1 }) => {
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Netflix Content (Fixed: using watch_providers instead of networks for movies)
export const fetchNetflixOriginals = createAsyncThunk(
  "movies/fetchNetflixOriginals",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${PROVIDERS.NETFLIX}&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchNetflixMovies = createAsyncThunk(
  "movies/fetchNetflixMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.NETFLIX}&watch_region=US&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchNetflixTrending = createAsyncThunk(
  "movies/fetchNetflixTrending",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.NETFLIX}&watch_region=US&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Disney+ Content
export const fetchDisneyPlusOriginals = createAsyncThunk(
  "movies/fetchDisneyPlusOriginals",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${PROVIDERS.DISNEY_PLUS}&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchDisneyPlusMovies = createAsyncThunk(
  "movies/fetchDisneyPlusMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.DISNEY_PLUS}&watch_region=US&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchDisneyPlusTrending = createAsyncThunk(
  "movies/fetchDisneyPlusTrending",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.DISNEY_PLUS}&watch_region=US&sort_by=popularity.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Amazon Prime Content
export const fetchAmazonPrimeOriginals = createAsyncThunk(
  "movies/fetchAmazonPrimeOriginals",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${PROVIDERS.AMAZON_PRIME}&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchAmazonPrimeMovies = createAsyncThunk(
  "movies/fetchAmazonPrimeMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.AMAZON_PRIME}&watch_region=US&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// HBO Max Content
export const fetchHBOMaxOriginals = createAsyncThunk(
  "movies/fetchHBOMaxOriginals",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${PROVIDERS.HBO_MAX}&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchHBOMaxMovies = createAsyncThunk(
  "movies/fetchHBOMaxMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.HBO_MAX}&watch_region=US&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Apple TV+ Content
export const fetchAppleTVOriginals = createAsyncThunk(
  "movies/fetchAppleTVOriginals",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=${PROVIDERS.APPLE_TV}&sort_by=first_air_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

export const fetchAppleTVMovies = createAsyncThunk(
  "movies/fetchAppleTVMovies",
  async (page = 1) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=${PROVIDERS.APPLE_TV}&watch_region=US&sort_by=release_date.desc&page=${page}`;
    return await fetchWithErrorHandling(url);
  }
);

// Fetch content details
export const fetchContentDetails = createAsyncThunk(
  "movies/fetchContentDetails",
  async ({ id, type = "movie" }) => {
    const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits,similar,recommendations`;
    return await fetchWithErrorHandling(url);
  }
);

const initialState = {
  popularMovies: { results: [], page: 1, totalPages: 0 },
  trendingMovies: { results: [], page: 1, totalPages: 0 },
  trendingTVShows: { results: [], page: 1, totalPages: 0 },
  topRatedMovies: { results: [], page: 1, totalPages: 0 },
  upcomingMovies: { results: [], page: 1, totalPages: 0 },
  anime: { results: [], page: 1, totalPages: 0 },
  tvShows: { results: [], page: 1, totalPages: 0 },
  allTVShows: { results: [], page: 1, totalPages: 0 },
  // NEW: Animation-specific state
  animatedMovies: { results: [], page: 1, totalPages: 0 },
  animatedTVShows: { results: [], page: 1, totalPages: 0 },
  animeMovies: { results: [], page: 1, totalPages: 0 },
  animeTV: { results: [], page: 1, totalPages: 0 },
  westernCartoons: { results: [], page: 1, totalPages: 0 },
  japaneseAnime: { results: [], page: 1, totalPages: 0 },
  // Existing state
  arabicContent: { results: [], page: 1, totalPages: 0 },
  latestArabicTV: { results: [], page: 1, totalPages: 0 },
  popularArabic: { results: [], page: 1, totalPages: 0 },
  ramadanContent: { results: [], page: 1, totalPages: 0, year: 2025 },
  frenchContent: { results: [], page: 1, totalPages: 0 },
  latestFrenchContent: { results: [], page: 1, totalPages: 0 },
  turkishContent: { results: [], page: 1, totalPages: 0 },
  turkishDrama: { results: [], page: 1, totalPages: 0 },
  latestTurkishMovies: { results: [], page: 1, totalPages: 0 },
  newestTurkishTV: { results: [], page: 1, totalPages: 0 },
  popularTurkish: { results: [], page: 1, totalPages: 0 },
  kDrama: { results: [], page: 1, totalPages: 0 },
  cDrama: { results: [], page: 1, totalPages: 0 },
  indianMovies: { results: [], page: 1, totalPages: 0 },
  marvelMovies: { results: [], page: 1, totalPages: 0 },
  footballMatches: { results: [], page: 1, totalPages: 0 },
  sportsDocumentaries: { results: [], page: 1, totalPages: 0 },
  liveSports: { results: [], page: 1, totalPages: 0 },
  // Streaming platforms
  netflixOriginals: { results: [], page: 1, totalPages: 0 },
  netflixMovies: { results: [], page: 1, totalPages: 0 },
  netflixTrending: { results: [], page: 1, totalPages: 0 },
  disneyPlusOriginals: { results: [], page: 1, totalPages: 0 },
  disneyPlusMovies: { results: [], page: 1, totalPages: 0 },
  disneyPlusTrending: { results: [], page: 1, totalPages: 0 },
  amazonPrimeOriginals: { results: [], page: 1, totalPages: 0 },
  amazonPrimeMovies: { results: [], page: 1, totalPages: 0 },
  hboMaxOriginals: { results: [], page: 1, totalPages: 0 },
  hboMaxMovies: { results: [], page: 1, totalPages: 0 },
  appleTVOriginals: { results: [], page: 1, totalPages: 0 },
  appleTVMovies: { results: [], page: 1, totalPages: 0 },

  // Other
  genres: { movie: [], tv: [] },
  upcomingTVShows: { results: [], page: 1, totalPages: 0 },
  searchResults: { results: [], page: 1, totalPages: 0, query: "" },
  contentDetails: null,
  loading: false,
  error: null,
  selectedContent: null,
};

// Helper function to handle pagination logic
const handlePaginatedResults = (state, action, stateKey) => {
  state.loading = false;

  // Append new results if not page 1, otherwise replace
  if (action.payload.page > 1) {
    state[stateKey].results = [
      ...state[stateKey].results,
      ...action.payload.results,
    ];
  } else {
    state[stateKey].results = action.payload.results;
  }

  state[stateKey].page = action.payload.page;
  state[stateKey].totalPages = action.payload.total_pages;
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = { results: [], page: 1, totalPages: 0, query: "" };
    },
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
    clearSelectedContent: (state) => {
      state.selectedContent = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearContentDetails: (state) => {
      state.contentDetails = null;
    },
    // Reset specific content category
    resetCategory: (state, action) => {
      const category = action.payload;
      if (state[category]) {
        state[category] = { results: [], page: 1, totalPages: 0 };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular Movies
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "popularMovies");
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Latest French Content
      .addCase(fetchLatestFrenchContent.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "latestFrenchContent");
      })
      .addCase(fetchLatestFrenchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestFrenchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Trending Movies
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "trendingMovies");
      })
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMulti.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = {
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.total_pages,
          query: action.meta.arg.query,
        };
      })
      .addCase(searchMulti.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMulti.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Trending TV Shows
      .addCase(fetchTrendingTVShows.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "trendingTVShows");
      })
      .addCase(fetchTrendingTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Top Rated Movies
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "topRatedMovies");
      })
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Upcoming Movies
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "upcomingMovies");
      })
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Anime
      .addCase(fetchAnime.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "anime");
      })
      .addCase(fetchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // NEW: Animation-specific reducers
      // Animated Movies
      .addCase(fetchAnimatedMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "animatedMovies");
      })
      .addCase(fetchAnimatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Animated TV Shows
      .addCase(fetchAnimatedTVShows.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "animatedTVShows");
      })
      .addCase(fetchAnimatedTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimatedTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Anime Movies
      .addCase(fetchAnimeMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "animeMovies");
      })
      .addCase(fetchAnimeMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Anime TV
      .addCase(fetchAnimeTV.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "animeTV");
      })
      .addCase(fetchAnimeTV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeTV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Western Cartoons
      .addCase(fetchWesternCartoons.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "westernCartoons");
      })
      .addCase(fetchWesternCartoons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWesternCartoons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Japanese Anime
      .addCase(fetchJapaneseAnime.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "japaneseAnime");
      })
      .addCase(fetchJapaneseAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJapaneseAnime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // TV Shows
      .addCase(fetchTVShows.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "tvShows");
      })
      .addCase(fetchTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // All TV Shows
      .addCase(fetchAllTVShows.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "allTVShows");
      })
      .addCase(fetchAllTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Arabic Content
      .addCase(fetchArabicContent.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "arabicContent");
      })
      .addCase(fetchArabicContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArabicContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Latest Arabic TV
      .addCase(fetchLatestArabicTV.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "latestArabicTV");
      })
      .addCase(fetchLatestArabicTV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestArabicTV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Popular Arabic
      .addCase(fetchPopularArabic.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "popularArabic");
      })
      .addCase(fetchPopularArabic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularArabic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Ramadan Content
      .addCase(fetchRamadanContent.fulfilled, (state, action) => {
        state.loading = false;
        state.ramadanContent = {
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.total_pages,
          year: action.meta.arg.year,
        };
      })
      .addCase(fetchRamadanContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRamadanContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // French Content
      .addCase(fetchFrenchContent.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "frenchContent");
      })
      .addCase(fetchFrenchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFrenchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Turkish Content
      .addCase(fetchTurkishContent.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "turkishContent");
      })
      .addCase(fetchTurkishContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTurkishContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Turkish Drama
      .addCase(fetchTurkishDrama.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "turkishDrama");
      })
      .addCase(fetchTurkishDrama.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTurkishDrama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Latest Turkish Movies
      .addCase(fetchLatestTurkishMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "latestTurkishMovies");
      })
      .addCase(fetchLatestTurkishMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestTurkishMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Newest Turkish TV
      .addCase(fetchNewestTurkishTV.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "newestTurkishTV");
      })
      .addCase(fetchNewestTurkishTV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewestTurkishTV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Popular Turkish
      .addCase(fetchPopularTurkish.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "popularTurkish");
      })
      .addCase(fetchPopularTurkish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularTurkish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // K-Drama
      .addCase(fetchKDrama.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "kDrama");
      })
      .addCase(fetchKDrama.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKDrama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // C-Drama
      .addCase(fetchCDrama.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "cDrama");
      })
      .addCase(fetchCDrama.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCDrama.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Indian Movies
      .addCase(fetchIndianMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "indianMovies");
      })
      .addCase(fetchIndianMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndianMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Marvel Movies
      .addCase(fetchMarvelMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "marvelMovies");
      })
      .addCase(fetchMarvelMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarvelMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Football Matches
      .addCase(fetchFootballMatches.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "footballMatches");
      })
      .addCase(fetchFootballMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFootballMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Sports Documentaries
      .addCase(fetchSportsDocumentaries.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "sportsDocumentaries");
      })
      .addCase(fetchSportsDocumentaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSportsDocumentaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Live Sports
      .addCase(fetchLiveSports.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "liveSports");
      })
      .addCase(fetchLiveSports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveSports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Netflix Originals
      .addCase(fetchNetflixOriginals.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "netflixOriginals");
      })
      .addCase(fetchNetflixOriginals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetflixOriginals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Netflix Movies
      .addCase(fetchNetflixMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "netflixMovies");
      })
      .addCase(fetchNetflixMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetflixMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Netflix Trending
      .addCase(fetchNetflixTrending.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "netflixTrending");
      })
      .addCase(fetchNetflixTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetflixTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Disney+ Originals
      .addCase(fetchDisneyPlusOriginals.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "disneyPlusOriginals");
      })
      .addCase(fetchDisneyPlusOriginals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisneyPlusOriginals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Disney+ Movies
      .addCase(fetchDisneyPlusMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "disneyPlusMovies");
      })
      .addCase(fetchDisneyPlusMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisneyPlusMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Disney+ Trending
      .addCase(fetchDisneyPlusTrending.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "disneyPlusTrending");
      })
      .addCase(fetchDisneyPlusTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisneyPlusTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Amazon Prime Originals
      .addCase(fetchAmazonPrimeOriginals.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "amazonPrimeOriginals");
      })
      .addCase(fetchAmazonPrimeOriginals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmazonPrimeOriginals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Amazon Prime Movies
      .addCase(fetchAmazonPrimeMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "amazonPrimeMovies");
      })
      .addCase(fetchAmazonPrimeMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmazonPrimeMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // HBO Max Originals
      .addCase(fetchHBOMaxOriginals.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "hboMaxOriginals");
      })
      .addCase(fetchHBOMaxOriginals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHBOMaxOriginals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // HBO Max Movies
      .addCase(fetchHBOMaxMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "hboMaxMovies");
      })
      .addCase(fetchHBOMaxMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHBOMaxMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Apple TV+ Originals
      .addCase(fetchAppleTVOriginals.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "appleTVOriginals");
      })
      .addCase(fetchAppleTVOriginals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppleTVOriginals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Apple TV+ Movies
      .addCase(fetchAppleTVMovies.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "appleTVMovies");
      })
      .addCase(fetchAppleTVMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppleTVMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Content Details
      .addCase(fetchContentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.contentDetails = action.payload;
      })
      .addCase(fetchContentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Genres
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Movies by Genre
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        // Store genre-based results in searchResults for now
        state.searchResults = {
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.total_pages,
          query: `Genre: ${action.meta.arg.genreId}`,
        };
      })
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // TV Shows by Genre
      .addCase(fetchTVShowsByGenre.fulfilled, (state, action) => {
        state.loading = false;
        // Store genre-based results in searchResults for now
        state.searchResults = {
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.total_pages,
          query: `TV Genre: ${action.meta.arg.genreId}`,
        };
      })
      .addCase(fetchTVShowsByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTVShowsByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Upcoming TV Shows
      .addCase(fetchUpcomingTVShows.fulfilled, (state, action) => {
        handlePaginatedResults(state, action, "upcomingTVShows");
      })
      .addCase(fetchUpcomingTVShows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingTVShows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Search Content
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = {
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.total_pages,
          query: action.meta.arg.query,
        };
      })
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  clearSearchResults,
  setSelectedContent,
  clearSelectedContent,
  setLoading,
  clearError,
  clearContentDetails,
  resetCategory,
} = movieSlice.actions;

// Selectors
export const selectAllMovies = (state) => state.movies;
export const selectPopularMovies = (state) => state.movies.popularMovies;
export const selectTrendingMovies = (state) => state.movies.trendingMovies;
export const selectTrendingTVShows = (state) => state.movies.trendingTVShows;
export const selectTopRatedMovies = (state) => state.movies.topRatedMovies;
export const selectUpcomingMovies = (state) => state.movies.upcomingMovies;
export const selectAnime = (state) => state.movies.anime;
export const selectTVShows = (state) => state.movies.tvShows;
export const selectAllTVShows = (state) => state.movies.allTVShows;
// NEW: Animation-specific selectors
export const selectAnimatedMovies = (state) => state.movies.animatedMovies;
export const selectAnimatedTVShows = (state) => state.movies.animatedTVShows;
export const selectAnimeMovies = (state) => state.movies.animeMovies;
export const selectAnimeTV = (state) => state.movies.animeTV;
export const selectWesternCartoons = (state) => state.movies.westernCartoons;
export const selectJapaneseAnime = (state) => state.movies.japaneseAnime;
// Existing selectors
export const selectArabicContent = (state) => state.movies.arabicContent;
export const selectLatestArabicTV = (state) => state.movies.latestArabicTV;
export const selectPopularArabic = (state) => state.movies.popularArabic;
export const selectRamadanContent = (state) => state.movies.ramadanContent;
export const selectFrenchContent = (state) => state.movies.frenchContent;
export const selectLatestFrenchContent = (state) =>
  state.movies.latestFrenchContent;
export const selectTurkishContent = (state) => state.movies.turkishContent;
export const selectTurkishDrama = (state) => state.movies.turkishDrama;
export const selectLatestTurkishMovies = (state) =>
  state.movies.latestTurkishMovies;
export const selectNewestTurkishTV = (state) => state.movies.newestTurkishTV;
export const selectPopularTurkish = (state) => state.movies.popularTurkish;
export const selectKDrama = (state) => state.movies.kDrama;
export const selectCDrama = (state) => state.movies.cDrama;
export const selectIndianMovies = (state) => state.movies.indianMovies;
export const selectMarvelMovies = (state) => state.movies.marvelMovies;
export const selectFootballMatches = (state) => state.movies.footballMatches;
export const selectSportsDocumentaries = (state) =>
  state.movies.sportsDocumentaries;
export const selectLiveSports = (state) => state.movies.liveSports;
export const selectNetflixOriginals = (state) => state.movies.netflixOriginals;
export const selectNetflixMovies = (state) => state.movies.netflixMovies;
export const selectNetflixTrending = (state) => state.movies.netflixTrending;
export const selectDisneyPlusOriginals = (state) =>
  state.movies.disneyPlusOriginals;
export const selectDisneyPlusMovies = (state) => state.movies.disneyPlusMovies;
export const selectDisneyPlusTrending = (state) =>
  state.movies.disneyPlusTrending;
export const selectAmazonPrimeOriginals = (state) =>
  state.movies.amazonPrimeOriginals;
export const selectAmazonPrimeMovies = (state) =>
  state.movies.amazonPrimeMovies;
export const selectHBOMaxOriginals = (state) => state.movies.hboMaxOriginals;
export const selectHBOMaxMovies = (state) => state.movies.hboMaxMovies;
export const selectAppleTVOriginals = (state) => state.movies.appleTVOriginals;
export const selectAppleTVMovies = (state) => state.movies.appleTVMovies;
export const selectGenres = (state) => state.movies.genres;
export const selectSearchResults = (state) => state.movies.searchResults;
export const selectLoading = (state) => state.movies.loading;
export const selectError = (state) => state.movies.error;
export const selectSelectedContent = (state) => state.movies.selectedContent;
export const selectContentDetails = (state) => state.movies.contentDetails;
export const selectUpcomingTVShows = (state) => state.movies.upcomingTVShows;

export default movieSlice.reducer;
