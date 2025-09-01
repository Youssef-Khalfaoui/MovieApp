import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback, useRef } from "react";

import {
  // Movie selectors and actions
  selectPopularMovies,
  selectTrendingMovies,
  selectTopRatedMovies,
  selectUpcomingMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,

  // TV Show selectors and actions
  selectTVShows,
  selectAllTVShows,
  selectTrendingTVShows,
  selectUpcomingTVShows,
  fetchTVShows,
  fetchAllTVShows,
  fetchTrendingTVShows,
  fetchUpcomingTVShows,

  // Anime & Animation selectors and actions
  selectAnime,
  selectAnimatedMovies,
  selectAnimatedTVShows,
  selectAnimeMovies,
  selectAnimeTV,
  selectWesternCartoons,
  selectJapaneseAnime,
  fetchAnime,
  fetchAnimatedMovies,
  fetchAnimatedTVShows,
  fetchAnimeMovies,
  fetchAnimeTV,
  fetchWesternCartoons,
  fetchJapaneseAnime,

  // Regional content selectors and actions
  selectArabicContent,
  selectLatestArabicTV,
  selectPopularArabic,
  selectRamadanContent,
  fetchArabicContent,
  fetchLatestArabicTV,
  fetchPopularArabic,
  fetchRamadanContent,
  selectFrenchContent,
  selectLatestFrenchContent,
  fetchFrenchContent,
  fetchLatestFrenchContent,
  selectTurkishContent,
  selectTurkishDrama,
  selectLatestTurkishMovies,
  selectNewestTurkishTV,
  selectPopularTurkish,
  fetchTurkishContent,
  fetchTurkishDrama,
  fetchLatestTurkishMovies,
  fetchNewestTurkishTV,
  fetchPopularTurkish,
  selectKDrama,
  selectCDrama,
  selectIndianMovies,
  fetchKDrama,
  fetchCDrama,
  fetchIndianMovies,

  // Streaming platform selectors and actions
  selectNetflixOriginals,
  selectNetflixMovies,
  selectNetflixTrending,
  fetchNetflixOriginals,
  fetchNetflixMovies,
  fetchNetflixTrending,
  selectDisneyPlusOriginals,
  selectDisneyPlusMovies,
  selectDisneyPlusTrending,
  fetchDisneyPlusOriginals,
  fetchDisneyPlusMovies,
  fetchDisneyPlusTrending,
  selectAmazonPrimeOriginals,
  selectAmazonPrimeMovies,
  fetchAmazonPrimeOriginals,
  fetchAmazonPrimeMovies,
  selectHBOMaxOriginals,
  selectHBOMaxMovies,
  fetchHBOMaxOriginals,
  fetchHBOMaxMovies,
  selectAppleTVOriginals,
  selectAppleTVMovies,
  fetchAppleTVOriginals,
  fetchAppleTVMovies,

  // Special categories
  selectMarvelMovies,
  selectFootballMatches,
  selectSportsDocumentaries,
  selectLiveSports,
  fetchMarvelMovies,
  fetchFootballMatches,
  fetchSportsDocumentaries,
  fetchLiveSports,
} from "../features/movies/moviesSlice";

// Comprehensive category configuration
const categoryConfigs = {
  // Movies
  "popular-movies": {
    title: "Popular Movies",
    selector: selectPopularMovies,
    fetchAction: fetchPopularMovies,
  },
  "trending-movies": {
    title: "Trending Movies",
    selector: selectTrendingMovies,
    fetchAction: fetchTrendingMovies,
  },
  "top-rated-movies": {
    title: "Top Rated Movies",
    selector: selectTopRatedMovies,
    fetchAction: fetchTopRatedMovies,
  },
  "upcoming-movies": {
    title: "Upcoming Movies",
    selector: selectUpcomingMovies,
    fetchAction: fetchUpcomingMovies,
  },

  // TV Shows
  "tv-shows": {
    title: "Popular TV Shows",
    selector: selectTVShows,
    fetchAction: fetchTVShows,
  },
  "all-tv-shows": {
    title: "All TV Shows",
    selector: selectAllTVShows,
    fetchAction: fetchAllTVShows,
  },
  "trending-tv": {
    title: "Trending TV Shows",
    selector: selectTrendingTVShows,
    fetchAction: fetchTrendingTVShows,
  },
  "upcoming-tv": {
    title: "Upcoming TV Shows",
    selector: selectUpcomingTVShows,
    fetchAction: fetchUpcomingTVShows,
  },

  // Animation & Anime
  anime: {
    title: "Anime",
    selector: selectAnime,
    fetchAction: fetchAnime,
  },
  "animated-movies": {
    title: "Animated Movies",
    selector: selectAnimatedMovies,
    fetchAction: fetchAnimatedMovies,
  },
  "animated-tv": {
    title: "Animated TV Shows",
    selector: selectAnimatedTVShows,
    fetchAction: fetchAnimatedTVShows,
  },
  "anime-movies": {
    title: "Anime Movies",
    selector: selectAnimeMovies,
    fetchAction: fetchAnimeMovies,
  },
  "anime-tv": {
    title: "Anime TV Series",
    selector: selectAnimeTV,
    fetchAction: fetchAnimeTV,
  },
  "western-cartoons": {
    title: "Western Cartoons",
    selector: selectWesternCartoons,
    fetchAction: fetchWesternCartoons,
  },
  "japanese-anime": {
    title: "Japanese Anime",
    selector: selectJapaneseAnime,
    fetchAction: fetchJapaneseAnime,
  },

  // Regional Content - Arabic
  "arabic-content": {
    title: "Arabic Movies",
    selector: selectArabicContent,
    fetchAction: fetchArabicContent,
  },
  "arabic-tv": {
    title: "Latest Arabic TV",
    selector: selectLatestArabicTV,
    fetchAction: fetchLatestArabicTV,
  },
  "popular-arabic": {
    title: "Popular Arabic Content",
    selector: selectPopularArabic,
    fetchAction: fetchPopularArabic,
  },
  "ramadan-content": {
    title: "Ramadan Series",
    selector: selectRamadanContent,
    fetchAction: (page = 1) =>
      fetchRamadanContent({ page, year: new Date().getFullYear() }),
  },

  // Regional Content - French
  "french-content": {
    title: "French Movies",
    selector: selectFrenchContent,
    fetchAction: fetchFrenchContent,
  },
  "latest-french": {
    title: "Latest French Content",
    selector: selectLatestFrenchContent,
    fetchAction: fetchLatestFrenchContent,
  },

  // Regional Content - Turkish
  "turkish-content": {
    title: "Turkish Movies",
    selector: selectTurkishContent,
    fetchAction: fetchTurkishContent,
  },
  "turkish-drama": {
    title: "Turkish Dramas",
    selector: selectTurkishDrama,
    fetchAction: fetchTurkishDrama,
  },
  "latest-turkish-movies": {
    title: "Latest Turkish Movies",
    selector: selectLatestTurkishMovies,
    fetchAction: fetchLatestTurkishMovies,
  },
  "newest-turkish-tv": {
    title: "Newest Turkish TV",
    selector: selectNewestTurkishTV,
    fetchAction: fetchNewestTurkishTV,
  },
  "popular-turkish": {
    title: "Popular Turkish Content",
    selector: selectPopularTurkish,
    fetchAction: fetchPopularTurkish,
  },

  // Regional Content - Asian
  "k-drama": {
    title: "Korean Dramas",
    selector: selectKDrama,
    fetchAction: fetchKDrama,
  },
  "c-drama": {
    title: "Chinese Dramas",
    selector: selectCDrama,
    fetchAction: fetchCDrama,
  },
  "indian-movies": {
    title: "Indian Movies",
    selector: selectIndianMovies,
    fetchAction: fetchIndianMovies,
  },

  // Streaming Platforms - Netflix
  "netflix-originals": {
    title: "Netflix Originals",
    selector: selectNetflixOriginals,
    fetchAction: fetchNetflixOriginals,
  },
  "netflix-movies": {
    title: "Netflix Movies",
    selector: selectNetflixMovies,
    fetchAction: fetchNetflixMovies,
  },
  "netflix-trending": {
    title: "Netflix Trending",
    selector: selectNetflixTrending,
    fetchAction: fetchNetflixTrending,
  },

  // Streaming Platforms - Disney+
  "disney-originals": {
    title: "Disney+ Originals",
    selector: selectDisneyPlusOriginals,
    fetchAction: fetchDisneyPlusOriginals,
  },
  "disney-movies": {
    title: "Disney+ Movies",
    selector: selectDisneyPlusMovies,
    fetchAction: fetchDisneyPlusMovies,
  },
  "disney-trending": {
    title: "Disney+ Trending",
    selector: selectDisneyPlusTrending,
    fetchAction: fetchDisneyPlusTrending,
  },

  // Streaming Platforms - Amazon Prime
  "amazon-originals": {
    title: "Amazon Prime Originals",
    selector: selectAmazonPrimeOriginals,
    fetchAction: fetchAmazonPrimeOriginals,
  },
  "amazon-movies": {
    title: "Amazon Prime Movies",
    selector: selectAmazonPrimeMovies,
    fetchAction: fetchAmazonPrimeMovies,
  },

  // Streaming Platforms - HBO Max
  "hbo-originals": {
    title: "HBO Max Originals",
    selector: selectHBOMaxOriginals,
    fetchAction: fetchHBOMaxOriginals,
  },
  "hbo-movies": {
    title: "HBO Max Movies",
    selector: selectHBOMaxMovies,
    fetchAction: fetchHBOMaxMovies,
  },

  // Streaming Platforms - Apple TV+
  "apple-originals": {
    title: "Apple TV+ Originals",
    selector: selectAppleTVOriginals,
    fetchAction: fetchAppleTVOriginals,
  },
  "apple-movies": {
    title: "Apple TV+ Movies",
    selector: selectAppleTVMovies,
    fetchAction: fetchAppleTVMovies,
  },

  // Special Categories
  "marvel-movies": {
    title: "Marvel Movies",
    selector: selectMarvelMovies,
    fetchAction: fetchMarvelMovies,
  },
  "football-matches": {
    title: "Football Matches",
    selector: selectFootballMatches,
    fetchAction: fetchFootballMatches,
  },
  "sports-documentaries": {
    title: "Sports Documentaries",
    selector: selectSportsDocumentaries,
    fetchAction: fetchSportsDocumentaries,
  },
  "live-sports": {
    title: "Live Sports",
    selector: selectLiveSports,
    fetchAction: fetchLiveSports,
  },
};

const More = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [allItems, setAllItems] = useState([]);

  // Assuming you have a way to get sidebar state from Redux or context
  // For this example, I'll create a mock selector - replace with your actual implementation
  const isSidebarOpen =
    useSelector((state) => state.ui?.isSidebarOpen) || false;

  const config = categoryConfigs[category];
  const data = useSelector(config?.selector || (() => null));

  // Load data for current page
  const loadMoreData = useCallback(
    async (page) => {
      if (!config || loadingRef.current || !hasMoreRef.current) return;

      loadingRef.current = true;
      try {
        const result = await dispatch(config.fetchAction(page));
        if (result.payload?.results?.length === 0) {
          hasMoreRef.current = false;
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        hasMoreRef.current = false;
      } finally {
        loadingRef.current = false;
      }
    },
    [config, dispatch]
  );

  // Update items when new data arrives - optimized to prevent unnecessary re-renders
  useEffect(() => {
    if (data?.results) {
      const validItems = data.results.filter((item) => item.poster_path);

      setAllItems((prevItems) => {
        // Only update if we have new items
        const newItemIds = new Set(validItems.map((item) => item.id));
        const currentItemIds = new Set(prevItems.map((item) => item.id));
        const hasNewItems = validItems.some(
          (item) => !currentItemIds.has(item.id)
        );

        if (!hasNewItems) return prevItems;

        const mergedItems = [...prevItems];
        validItems.forEach((item) => {
          if (!currentItemIds.has(item.id)) {
            mergedItems.push(item);
          }
        });

        return mergedItems;
      });

      if (data.page >= data.totalPages) {
        hasMoreRef.current = false;
      }
    }
  }, [data]);

  // Reset when category changes
  useEffect(() => {
    if (config) {
      setAllItems([]);
      hasMoreRef.current = true;
      loadingRef.current = false;
      setCurrentPage(1);
      loadMoreData(1);

      // Clean up observer on category change
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }

    return () => {
      // Clean up observer on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [category, config, loadMoreData]);

  // Infinite scroll observer - optimized with throttling
  const lastItemRef = useCallback(
    (node) => {
      if (loadingRef.current || !hasMoreRef.current) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Throttle the intersection observer
      let observerTimeout;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Use a timeout to throttle rapid firing
            if (observerTimeout) clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
              setCurrentPage((prev) => {
                const nextPage = prev + 1;
                loadMoreData(nextPage);
                return nextPage;
              });
            }, 200); // 200ms throttle
          }
        },
        {
          rootMargin: "100px",
          threshold: 0.1, // Lower threshold for better performance
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [loadMoreData]
  );

  // Handle invalid category
  if (!config) {
    return (
      <ErrorContainer>
        <h2>Category not found</h2>
        <p>The category "{category}" doesn't exist or isn't available yet.</p>
        <BackButton to="/">‹ Back to Home</BackButton>
      </ErrorContainer>
    );
  }

  return (
    <Container $isSidebarOpen={isSidebarOpen}>
      <Header>
        <BackButton to="/">‹ Back to Home</BackButton>
        <Title>{config.title}</Title>
        <PageInfo>{allItems.length} items loaded</PageInfo>
      </Header>

      <Grid>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <ItemCard
              key={`${item.id}-${index}`}
              ref={isLast ? lastItemRef : null}
            >
              <Link
                to={`/detail/${item.id}?type=${
                  item.media_type || (item.first_air_date ? "tv" : "movie")
                }`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  loading="lazy"
                />
                <ItemInfo>
                  <ItemTitle>{item.title || item.name}</ItemTitle>
                  <ItemDetails>
                    {item.vote_average > 0 && (
                      <ItemRating>★ {item.vote_average.toFixed(1)}</ItemRating>
                    )}
                    {(item.release_date || item.first_air_date) && (
                      <ItemYear>
                        {new Date(
                          item.release_date || item.first_air_date
                        ).getFullYear()}
                      </ItemYear>
                    )}
                  </ItemDetails>
                  <ContentType>
                    {item.first_air_date ? "TV Show" : "Movie"}
                  </ContentType>
                </ItemInfo>
              </Link>
            </ItemCard>
          );
        })}
      </Grid>

      {!hasMoreRef.current && allItems.length > 0 && (
        <EndMessage>
          <p>You've reached the end! No more content to load.</p>
          <BackToTopButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑ Back to Top
          </BackToTopButton>
        </EndMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  margin-top: 65px;
  margin-left: ${(props) => (props.$isSidebarOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  width: ${(props) => (props.$isSidebarOpen ? "calc(100% - 250px)" : "100%")};
  body.sidebar-open & {
    @media (min-width: 769px) {
      width: calc(100% - 250px);
      margin-left: 250px;
    }
  }
  @media (max-width: 1024px) {
    margin-left: 0;
    width: 100%;
    padding: 30px 20px;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin-bottom: 30px;
  }
`;

const BackButton = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateX(-5px);
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  text-align: center;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PageInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  text-align: center;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  padding: 20px;

  h2 {
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 30px;
    opacity: 0.8;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 50px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
`;

const ItemCard = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  height: 380px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 0.3s ease;
  position: relative;

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  img {
    height: 70%;
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: rgba(249, 249, 249, 0.8);
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ItemInfo = styled.div`
  padding: 10px;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ItemTitle = styled.h3`
  color: #f9f9f9;
  font-size: 0.9rem;
  margin: 0 0 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const ItemRating = styled.span`
  color: #ffd700;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ItemYear = styled.span`
  color: rgba(249, 249, 249, 0.7);
  font-size: 0.8rem;
`;

const ContentType = styled.span`
  color: rgba(249, 249, 249, 0.6);
  font-size: 0.7rem;
  background: rgba(249, 249, 249, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
  align-self: flex-start;
`;

const EndMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 20px;
  text-align: center;

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    margin: 0;
  }
`;

const BackToTopButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
  }
`;

export default More;
