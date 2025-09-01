import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  selectUpcomingMovies,
  selectUpcomingTVShows,
  selectLoading,
} from "../features/movies/moviesSlice.js";
import { getImageUrl } from "../utils/helpers.js";

const HeroSlider = () => {
  const navigate = useNavigate();
  const upcomingMovies = useSelector(selectUpcomingMovies);
  const upcomingTVShows = useSelector(selectUpcomingTVShows);
  const loading = useSelector(selectLoading);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [combinedContent, setCombinedContent] = useState([]);

  useEffect(() => {
    const movies = upcomingMovies.results.slice(0, 10).map((item) => ({
      ...item,
      type: "movie",
      title: item.title,
      releaseDate: item.release_date,
    }));

    const tvShows = upcomingTVShows.results.slice(0, 10).map((item) => ({
      ...item,
      type: "tv",
      title: item.name,
      releaseDate: item.first_air_date,
    }));

    const combined = [...movies, ...tvShows]
      .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
      .slice(0, 10);

    setCombinedContent(combined);
  }, [upcomingMovies, upcomingTVShows]);

  useEffect(() => {
    if (combinedContent.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % combinedContent.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [combinedContent.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % combinedContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + combinedContent.length) % combinedContent.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSlideClick = () => {
    const currentItem = combinedContent[currentSlide];
    if (currentItem) {
      navigate(`/detail/${currentItem.id}?type=${currentItem.type}`);
    }
  };

  if (loading) {
    return (
      <SliderContainer className="hero-slider loading">
        <SliderPlaceholder>Loading upcoming content...</SliderPlaceholder>
      </SliderContainer>
    );
  }

  if (combinedContent.length === 0) {
    return (
      <SliderContainer className="hero-slider">
        <SliderPlaceholder>No upcoming content available</SliderPlaceholder>
      </SliderContainer>
    );
  }

  const currentItem = combinedContent[currentSlide];

  return (
    <SliderContainer className="hero-slider">
      <ClickableBackground
        style={{
          backgroundImage: `url(${getImageUrl(
            currentItem.backdrop_path,
            "w1280"
          )})`,
        }}
        onClick={handleSlideClick}
      >
        <SliderOverlay />
      </ClickableBackground>

      <SliderContent className="slider-content">
        <SliderInfo className="slider-info">
          <ClickableTitle onClick={handleSlideClick}>
            <SliderTitle className="slider-title">
              {currentItem.title}
            </SliderTitle>
          </ClickableTitle>
          <SliderOverview className="slider-overview">
            {currentItem.overview?.length > 150
              ? `${currentItem.overview.substring(0, 150)}...`
              : currentItem.overview}
          </SliderOverview>
          <SliderMeta className="slider-meta">
            <MetaItem className="slider-type">
              {currentItem.type.toUpperCase()}
            </MetaItem>
            <MetaItem className="slider-rating">
              ⭐ {currentItem.vote_average?.toFixed(1)}
            </MetaItem>
            <MetaItem className="slider-date">
              {new Date(currentItem.releaseDate).toLocaleDateString()}
            </MetaItem>
          </SliderMeta>
        </SliderInfo>
      </SliderContent>

      <SliderArrow
        className="slider-arrow slider-arrow-left"
        onClick={prevSlide}
      >
        ‹
      </SliderArrow>
      <SliderArrow
        className="slider-arrow slider-arrow-right"
        onClick={nextSlide}
        right
      >
        ›
      </SliderArrow>

      <SliderDots className="slider-dots">
        {combinedContent.map((_, index) => (
          <SliderDot
            key={index}
            className={`slider-dot ${index === currentSlide ? "active" : ""}`}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </SliderDots>
    </SliderContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  top: -65px;
  z-index: -1;
  height: 89vh;
  min-height: 500px;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-in;

  @media (max-width: 1024px) {
    height: 70vh;
    min-height: 400px;
  }

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 350px;
    border: 3px solid white;
    border-radius: 20px;
    margin: 0 15px;
    top: 70px !important;
  }

  @media (max-width: 480px) {
    height: 45vh;
    min-height: 250px;
    border: 2px solid white;
    border-radius: 15px;
    margin: 0 10px;
    top: -35px;
  }

  @media (max-width: 360px) {
    height: 40vh;
    min-height: 200px;
    border: 2px solid white;
    border-radius: 12px;
    margin: 0 8px;
    top: -30px;
  }
`;

const ClickableBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  cursor: pointer;

  @media (max-width: 768px) {
    background-position: center top;
    border-radius: 17px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }

  @media (max-width: 360px) {
    border-radius: 9px;
  }
`;

const SliderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );

  @media (max-width: 768px) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    border-radius: 17px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }

  @media (max-width: 360px) {
    border-radius: 9px;
  }
`;

const SliderContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 60px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    align-items: flex-end;
    padding-bottom: 60px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    padding-bottom: 40px;
  }

  @media (max-width: 360px) {
    padding: 0 10px;
    padding-bottom: 30px;
  }
`;

const SliderInfo = styled.div`
  max-width: 600px;
  color: white;
  position: absolute;
  bottom: 0;

  @media (max-width: 1024px) {
    max-width: 500px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const ClickableTitle = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    text-shadow: 0 0 10px rgba(229, 9, 20, 0.7);
  }
`;

const SliderTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  text-align: start;
  line-height: 1.1;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }

  @media (max-width: 360px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const SliderOverview = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  text-align: start;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const SliderMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    gap: 0.3rem;
    margin-bottom: 0.3rem;
    justify-content: center;
  }

  @media (max-width: 360px) {
    gap: 0.2rem;
  }
`;

const MetaItem = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  display: flex;
  justify-content: start;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 0.15rem 0.3rem;
    font-size: 0.6rem;
    border-radius: 8px;
    white-space: nowrap;
    justify-content: center;
  }

  @media (max-width: 360px) {
    padding: 0.1rem 0.2rem;
    font-size: 0.55rem;
    border-radius: 6px;
  }
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: black;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  left: ${(props) => (props.right ? "auto" : "20px")};
  right: ${(props) => (props.right ? "20px" : "auto")};

  opacity: 0;
  visibility: hidden;

  ${SliderContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 1024px) {
    width: 36px;
    height: 36px;
    font-size: 20px;
    left: ${(props) => (props.right ? "auto" : "15px")};
    right: ${(props) => (props.right ? "15px" : "auto")};
  }

  @media (max-width: 768px) {
    opacity: 1;
    visibility: visible;
    width: 32px;
    height: 32px;
    font-size: 18px;
    left: ${(props) => (props.right ? "auto" : "25px")};
    right: ${(props) => (props.right ? "25px" : "auto")};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;

  @media (max-width: 768px) {
    bottom: 25px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    bottom: 18px;
    gap: 4px;
  }

  @media (max-width: 360px) {
    bottom: 16px;
    gap: 3px;
  }
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.active ? "#e50914" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${(props) => (props.active ? "scale(1.2)" : "scale(1)")};

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }

  @media (max-width: 360px) {
    width: 5px;
    height: 5px;
  }
`;

const SliderPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0 10px;
  }

  @media (max-width: 360px) {
    font-size: 0.7rem;
    padding: 0 8px;
  }
`;

export default HeroSlider;