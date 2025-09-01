import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { 
  fetchTVShows,
  fetchTrendingTVShows,
  fetchUpcomingTVShows,
  fetchAnime,
  fetchAllTVShows
} from "../features/movies/moviesSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TVShows = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('popular');
  
  const { results, page, totalPages } = useSelector((state) => {
    switch (selectedTab) {
      case 'trending':
        return state.movies.trendingTVShows;
      case 'upcoming':
        return state.movies.upcomingTVShows;
      case 'anime':
        return state.movies.anime;
      case 'all':
        return state.movies.allTVShows;
      default:
        return state.movies.tvShows; // popular
    }
  });
  
  const loading = useSelector((state) => state.movies.loading);
  
  const lastScrollY = useRef(0);
  const isLoading = useRef(false);
  const [initialPagesLoaded, setInitialPagesLoaded] = useState(false);

  useEffect(() => {
    if (results.length === 0 && !initialPagesLoaded) {
      const loadInitialPages = async () => {
        try {
          let fetchFunction;
          switch (selectedTab) {
            case 'trending':
              fetchFunction = fetchTrendingTVShows;
              break;
            case 'upcoming':
              fetchFunction = fetchUpcomingTVShows;
              break;
            case 'anime':
              fetchFunction = fetchAnime;
              break;
            case 'all':
              fetchFunction = fetchAllTVShows;
              break;
            default:
              fetchFunction = fetchTVShows;
          }
          
          await dispatch(fetchFunction(1));
          await dispatch(fetchFunction(2));
          setInitialPagesLoaded(true);
        } catch (error) {
          console.error("Error loading initial TV shows:", error);
          setInitialPagesLoaded(true);
        }
      };
      
      loadInitialPages();
    }
  }, [dispatch, results.length, initialPagesLoaded, selectedTab]);

  useEffect(() => {
    setInitialPagesLoaded(false);
  }, [selectedTab]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      
      if (
        scrollingDown &&
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 500 &&
        page < totalPages &&
        !isLoading.current &&
        !loading &&
        initialPagesLoaded
      ) {
        isLoading.current = true;
        
        let fetchFunction;
        switch (selectedTab) {
          case 'trending':
            fetchFunction = fetchTrendingTVShows;
            break;
          case 'upcoming':
            fetchFunction = fetchUpcomingTVShows;
            break;
          case 'anime':
            fetchFunction = fetchAnime;
            break;
          case 'all':
            fetchFunction = fetchAllTVShows;
            break;
          default:
            fetchFunction = fetchTVShows;
        }
        
        dispatch(fetchFunction(page + 1)).finally(() => {
          isLoading.current = false;
        });
      }
      
      lastScrollY.current = currentScrollY;
    };

    if (initialPagesLoaded) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [dispatch, page, totalPages, loading, initialPagesLoaded, selectedTab]);

  return (
    <Container>
      <Title>TV Shows</Title>
      
      <TabContainer>
        <Tab 
          active={selectedTab === 'popular'} 
          onClick={() => setSelectedTab('popular')}
        >
          Popular
        </Tab>
        <Tab 
          active={selectedTab === 'trending'} 
          onClick={() => setSelectedTab('trending')}
        >
          Trending
        </Tab>
        <Tab 
          active={selectedTab === 'upcoming'} 
          onClick={() => setSelectedTab('upcoming')}
        >
          On The Air
        </Tab>
        <Tab 
          active={selectedTab === 'anime'} 
          onClick={() => setSelectedTab('anime')}
        >
          Anime
        </Tab>
        <Tab 
          active={selectedTab === 'all'} 
          onClick={() => setSelectedTab('all')}
        >
          All TV Shows
        </Tab>
      </TabContainer>
      
      <Grid>
        {results
          .filter((show) => show.poster_path)
          .map((show) => (
            <Wrap key={show.id}>
              {/* Fixed: Added type parameter to distinguish TV shows from movies */}
              <Link to={`/detail/${show.id}?type=tv`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name || show.title}
                  loading="lazy"
                />
                <ContentInfo>
                  <ContentTitle>{show.name || show.title}</ContentTitle>
                  <ContentDetails>
                    <Rating>★ {show.vote_average?.toFixed(1)}</Rating>
                    <ReleaseYear>
                      {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                    </ReleaseYear>
                  </ContentDetails>
                  <ContentType>
                    TV Series
                  </ContentType>
                </ContentInfo>
              </Link>
            </Wrap>
          ))}
      </Grid>
      
      {loading && (
        <LoadingIndicator>
          <LoadingSpinner />
          <LoadingText>Loading more TV shows...</LoadingText>
        </LoadingIndicator>
      )}
      
      {!loading && results.length === 0 && (
        <EmptyState>
          <EmptyText>No TV shows found</EmptyText>
        </EmptyState>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 40px;
  margin-bottom: 30px;
  margin-top: 100px;
    transition: margin-left 0.3s ease-in-out;
  body.sidebar-open & {
    @media (min-width: 769px) {
      width:calc(100% - 250px);
      margin-left: 250px;
    }
  }
`;

const Title = styled.h2`
  color: #f9f9f9;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(249, 249, 249, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(249, 249, 249, 0.3);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const Tab = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(249, 249, 249, 0.1)'};
  color: #f9f9f9;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? 'transparent' : 'rgba(249, 249, 249, 0.1)'};

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(249, 249, 249, 0.2)'};
    border-color: rgba(249, 249, 249, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 15px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  height: 380px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 0.3s ease;
  position: relative;

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

const ContentInfo = styled.div`
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

const ContentTitle = styled.h3`
  color: #f9f9f9;
  font-size: 0.9rem;
  margin: 0 0 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const ContentDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Rating = styled.span`
  color: #ffd700;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ReleaseYear = styled.span`
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

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 15px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-left: 3px solid #f9f9f9;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: #f9f9f9;
  font-size: 1rem;
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
`;

const EmptyText = styled.p`
  color: rgba(249, 249, 249, 0.6);
  font-size: 1.2rem;
  margin: 0;
`;

export default TVShows;