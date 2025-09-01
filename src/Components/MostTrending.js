import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {  fetchTrendingMovies } from "../features/movies/moviesSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MostTrending = () => {
  const dispatch = useDispatch();
  const { results, page, totalPages } = useSelector(
    (state) => state.movies.trendingMovies
  );

  useEffect(() => {
    if (results.length === 0) {
      dispatch(fetchTrendingMovies(1));
    }
  }, [dispatch, results.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 && 
        page < totalPages
      ) {
        dispatch(fetchTrendingMovies(page + 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, page, totalPages]);

  return (
    <Container>
      <Header>
        <h3 className="TITLE">Most Trending</h3>
      </Header>

      <Grid>
        {results
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Wrap key={movie.id}>
              <Link to={`/detail/${movie.id}?type=${movie.media_type || (movie.first_air_date ? 'tv' : 'movie')}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
              </Link>
            </Wrap>
          ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 40px;
  margin-bottom: 30px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    color: white;
    font-size: 24px;
    font-weight: 600;
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
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  height: 300px;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default MostTrending;
