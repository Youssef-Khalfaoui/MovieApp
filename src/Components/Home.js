import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import HeroSlider from "./ImgSlider";
import {
  fetchUpcomingMovies,
  fetchUpcomingTVShows,
} from "../features/movies/moviesSlice";
import TrendingMovies from "./TrendingMovies";
import TrendingTvShows from "./TrendingSeries";
import PopularMovies from "./PopularMovies";
import TurkishDrama from "./TurkishDrama";
import FrenchDubbed from "./FrenchDubbed";
import ArabicDubbed from "./ArabicDubbed";
import TurkishTVShows from "./TurkishTvShows";
import TopWatch from "./TopWatch";
import KDrama from "./K-Drama";
import CDrama from "./C-Drama";
import Indian from "./Indian";
import Marvel from "./Marvel";
import NetflixMovies from "./NetflixMovies";
import AppleTv from "./AppleTv";
import HBO from "./HBO";
import Anime from "./Anime";
import MostTrending from "./MostTrending";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
    dispatch(fetchUpcomingTVShows());
  }, [dispatch]);

  return (
    <HomeContainer>
      <HeroSlider />
      <TrendingMovies />
      <TrendingTvShows />
      <PopularMovies />
      <TurkishDrama />
      <TurkishTVShows />
      <FrenchDubbed />
      <ArabicDubbed />
      <TopWatch />
      <KDrama />
      <CDrama />
      <Indian />
      <Marvel />
      <NetflixMovies />
      <AppleTv />
      <HBO />
      <Anime />
      <MostTrending/>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  margin-top: 65px; 
  transition: margin-left 0.3s ease-in-out;
  
  body.sidebar-open & {
    @media (min-width: 769px) {
      margin-left: 250px;
    }
  }
`;

export default Home;