import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { searchMulti, selectSearchResults } from "../features/movies/moviesSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const observerRef = useRef(null);
  
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const searchData = useSelector(selectSearchResults);
  const allItems = searchData.results || [];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlQuery = searchParams.get("q");
    
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      setCurrentPage(1);
      setHasMore(true);
      dispatch(searchMulti({ query: urlQuery, page: 1 }));
    }
  }, [location.search, dispatch]);

  const loadMoreResults = useCallback(() => {
    if (!query || !hasMore) return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(searchMulti({ query, page: nextPage }));
  }, [query, currentPage, hasMore, dispatch]);

  const lastItemRef = useCallback((node) => {
    if (!node || !hasMore) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreResults();
      }
    }, { threshold: 0.1 });
    
    observerRef.current.observe(node);
  }, [loadMoreResults, hasMore]);

  useEffect(() => {
    if (searchData.page >= searchData.totalPages) {
      setHasMore(false);
    }
  }, [searchData.page, searchData.totalPages]);

  if (!query) {
    return (
      <Container>
        <Header>
          <BackButton to="/">‹ Back to Home</BackButton>
          <Title>Search</Title>
        </Header>
        <EmptyState>
          <SearchIconLarge />
          <h3>Search for movies and TV shows</h3>
          <p>Enter a title in the search box to find content</p>
        </EmptyState>
      </Container>
    );
  }

  if (allItems.length === 0 && !searchData.loading) {
    return (
      <Container>
        <Header>
          <BackButton to="/">‹ Back to Home</BackButton>
          <Title>Search Results for "{query}"</Title>
        </Header>
        <EmptyState>
          <h3>No results found</h3>
          <p>We couldn't find any matches for "{query}"</p>
          <p>Try different keywords or check the spelling</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton to="/">‹ Back to Home</BackButton>
        <Title>Search Results for "{query}"</Title>
        <ResultCount>{allItems.length} results</ResultCount>
      </Header>

      <Grid>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          
          if (!item.poster_path) return null;
          
          return (
            <ItemCard
              key={`${item.id}-${item.media_type}-${index}`}
              ref={isLast ? lastItemRef : null}
            >
              <Link to={`/detail/${item.media_type}/${item.id}`}>
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
                        {new Date(item.release_date || item.first_air_date).getFullYear()}
                      </ItemYear>
                    )}
                  </ItemDetails>
                  <ContentType>
                    {item.media_type === 'tv' ? 'TV Show' : 'Movie'}
                  </ContentType>
                </ItemInfo>
              </Link>
            </ItemCard>
          );
        })}
      </Grid>

      {searchData.loading && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading more results...</LoadingText>
        </LoadingContainer>
      )}

      {!hasMore && allItems.length > 0 && (
        <EndMessage>
          <p>You've seen all results for "{query}"</p>
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

const ResultCount = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  color: white;
  text-align: center;

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    opacity: 0.7;
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const SearchIconLarge = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  &::before {
    content: "🔍";
    font-size: 40px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 50px;

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  margin: 0;
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

export default SearchResults;