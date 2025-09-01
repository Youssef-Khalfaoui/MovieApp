import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  selectIndianMovies,
  fetchIndianMovies,
} from "../features/movies/moviesSlice";


const Indian = (props) => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector(selectIndianMovies);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchIndianMovies());
  }, [dispatch]);

const categoryConfig = {
  id: 'indian-movies',
  title: 'Indian Movies',
  route: '/more/indian-movies'
};
  const moviesPerSlide = 8;
  const validMovies =
    trendingMovies.results?.filter((movie) => movie.poster_path) || [];

  const totalSlides = Math.ceil(validMovies.length / moviesPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Container>
      <Header>
        <Title>
          <h3 className="TITLE">Indian Movies</h3>

        </Title>

        <Controls>
          <NavButton onClick={prevSlide} disabled={currentIndex === 0}>
            ‹
          </NavButton>
          {currentIndex === totalSlides - 1 ? (
            <MoreButton to={`/more/${categoryConfig.id}`}>More ›</MoreButton>
          ) : (
            <NavButton
              onClick={nextSlide}
              disabled={currentIndex === totalSlides - 1}
            >
              ›
            </NavButton>
          )}
        </Controls>
      </Header>

      <CarouselContainer>
        <CarouselWrapper>
          <CarouselTrack
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <Slide key={slideIndex}>
                {validMovies
                  .slice(
                    slideIndex * moviesPerSlide,
                    (slideIndex + 1) * moviesPerSlide
                  )
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
              </Slide>
            ))}
          </CarouselTrack>
        </CarouselWrapper>
      </CarouselContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 40px;
  margin-bottom: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h3 {
    color: white;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;



const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const MoreButton = styled(Link)`
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0 15px;
  height: 40px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }
`;

const CarouselContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Slide = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 15px;
  flex: 0 0 100%;

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
  position: relative;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  height: 300px;
  width: 100%;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 1;
    transition: opacity 500ms ease-in-out 0s;
  }

  &:hover {
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Indian;
