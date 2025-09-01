import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import {
  fetchContentDetails,
  selectContentDetails,
  selectLoading,
  clearContentDetails,
} from '../features/movies/moviesSlice';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const contentDetails = useSelector(selectContentDetails);
  const loading = useSelector(selectLoading);
  const [showTrailer, setShowTrailer] = useState(false);

  // Get the content type from URL parameters, default to 'movie' if not specified
  const contentType = searchParams.get('type') || 'movie';

  useEffect(() => {
    // Pass both id and type to fetchContentDetails
    dispatch(fetchContentDetails({ id, type: contentType }));

    return () => {
      dispatch(clearContentDetails());
    };
  }, [dispatch, id, contentType]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) setShowTrailer(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (!contentDetails) {
    return <ErrorContainer>Content not found</ErrorContainer>;
  }

  const {
    title,
    name,
    poster_path,
    backdrop_path,
    overview,
    release_date,
    first_air_date,
    vote_average,
    genres,
    runtime,
    number_of_seasons,
    number_of_episodes,
    videos,
    credits,
    similar,
    recommendations,
  } = contentDetails;

  const contentTitle = title || name;
  const releaseDate = release_date || first_air_date;
  const isMovie = contentType === 'movie';
  const trailer = videos?.results?.find(video => 
    (video.type === 'Trailer' || video.type === 'Teaser') && video.site === 'YouTube'
  );

  // Use poster as fallback if no backdrop is available
  const backgroundImage = backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
    : poster_path 
      ? `https://image.tmdb.org/t/p/w1280${poster_path}`
      : '';

  return (
    <Container>
      {showTrailer && trailer && (
        <ModalOverlay onClick={() => setShowTrailer(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowTrailer(false)}>×</CloseButton>
            <TrailerContainer>
              <TrailerFrame
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={`${contentTitle} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </TrailerContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      <HeroSection backdrop={backgroundImage}>
        <BackButton onClick={() => navigate(-1)}>‹ Back</BackButton>
        <HeroContent>
          <Poster src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/placeholder-poster.jpg'} alt={contentTitle} />
          <HeroInfo>
            <Title>{contentTitle}</Title>
            <MetaData>
              {releaseDate && <ReleaseDate>{new Date(releaseDate).getFullYear()}</ReleaseDate>}
              {genres && genres.length > 0 && (
                <Genres>
                  {genres.map(genre => (
                    <Genre key={genre.id}>{genre.name}</Genre>
                  ))}
                </Genres>
              )}
              {runtime && <Runtime>{runtime} min</Runtime>}
              {!isMovie && number_of_seasons && (
                <Seasons>{number_of_seasons} season{number_of_seasons !== 1 ? 's' : ''}</Seasons>
              )}
            </MetaData>
            <Rating>
              <Star>★</Star>
              {vote_average ? vote_average.toFixed(1) : 'N/A'}
            </Rating>
            <Overview>{overview}</Overview>
            {trailer && (
              <TrailerButton onClick={() => setShowTrailer(true)}>
                Watch Trailer
              </TrailerButton>
            )}
          </HeroInfo>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Cast & Recommendations</SectionTitle>
        
        <ContentWrapper>
          <CastSection>
            <SubSectionTitle>Cast</SubSectionTitle>
            {credits && credits.cast && credits.cast.length > 0 ? (
              <CastGrid>
                {credits.cast.slice(0, 12).map(person => (
                  <CastMember key={person.id}>
                    <CastImage 
                      src={person.profile_path 
                        ? `https://image.tmdb.org/t/p/w200${person.profile_path}` 
                        : '/placeholder-person.jpg'
                      } 
                      alt={person.name}
                    />
                    <CastInfo>
                      <CastName>{person.name}</CastName>
                      <CastCharacter>{person.character}</CastCharacter>
                    </CastInfo>
                  </CastMember>
                ))}
              </CastGrid>
            ) : (
              <NoData>No cast information available</NoData>
            )}
          </CastSection>

          <RecommendationsSection>
            <SubSectionTitle>You Might Also Like</SubSectionTitle>
            {recommendations && recommendations.results && recommendations.results.length > 0 ? (
              <RecommendationsGrid>
                {recommendations.results.slice(0, 6).map(item => (
                  <RecommendationItem 
                    key={item.id} 
                    onClick={() => {
                      // Determine the type based on the item's media_type or use the same type as current content
                      const itemType = item.media_type || contentType;
                      navigate(`/detail/${item.id}?type=${itemType}`);
                    }}
                  >
                    <RecommendationImage 
                      src={item.poster_path 
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}` 
                        : '/placeholder-poster.jpg'
                      } 
                      alt={item.title || item.name}
                    />
                    <RecommendationTitle>{item.title || item.name}</RecommendationTitle>
                    <RecommendationRating>
                      <StarSmall>★</StarSmall>
                      {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
                    </RecommendationRating>
                  </RecommendationItem>
                ))}
              </RecommendationsGrid>
            ) : (
              <NoData>No recommendations available</NoData>
            )}
          </RecommendationsSection>
        </ContentWrapper>
      </ContentSection>
    </Container>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Container = styled.div`
  color: white;
  min-height: 100vh;
  background: #0c0c0c;
  margin-top: 65px;
    transition: margin-left 0.3s ease-in-out;

      body.sidebar-open & {
    @media (min-width: 769px) {
      margin-left: 250px;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 1.5rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 1.5rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${scaleIn} 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;

const TrailerContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; 
  height: 0;
  overflow: hidden;
`;

const TrailerFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  background: linear-gradient(to top, #0c0c0c 0%, transparent 50%),
    ${props => props.backdrop ? `url(${props.backdrop})` : '#2c2c2c'} center/cover no-repeat;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(to top, #0c0c0c, transparent);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 1rem;
    align-items: center;
    background: linear-gradient(to top, #0c0c0c 0%, transparent 30%),
      ${props => props.backdrop ? `url(${props.backdrop})` : '#2c2c2c'} center/cover no-repeat;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  z-index: 5;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 225px;
  }
`;

const HeroInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 0 0 1rem 0;
  font-weight: 800;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const MetaData = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    justify-content: center;
    gap: 0.7rem;
  }
`;

const ReleaseDate = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  backdrop-filter: blur(5px);
`;

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Genre = styled.span`
  background: rgba(229, 9, 20, 0.8);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
`;

const Runtime = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  backdrop-filter: blur(5px);
`;

const Seasons = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  backdrop-filter: blur(5px);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  width: fit-content;
  backdrop-filter: blur(5px);
`;

const Star = styled.span`
  color: #ffc107;
  font-size: 1.5rem;
`;

const Overview = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 1.8rem;
  max-width: 650px;
  background: rgba(0, 0, 0, 0.5);
  padding: 1.2rem;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  border-left: 4px solid #e50914;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const TrailerButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  align-self: flex-start;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);

  &:hover {
    background: #f40612;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.6);
  }

  @media (max-width: 768px) {
    align-self: center;
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin: 2rem auto;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  padding-bottom: 0.8rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: #e50914;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const CastSection = styled.div`
  flex: 0 0 60%;
  
  @media (max-width: 992px) {
    flex: 1;
  }
`;

const RecommendationsSection = styled.div`
  flex: 0 0 35%;
  
  @media (max-width: 992px) {
    flex: 1;
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: #fff;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #e50914;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }
`;

const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 1rem;
  }
`;

const CastMember = styled.div`
  display: flex;
  align-items: center;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(5px);
  padding: 0.8rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CastImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 50px;
  }
`;

const CastInfo = styled.div`
  flex: 1;
`;

const CastName = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.3rem 0;
  font-weight: 600;
  color: #fff;
`;

const CastCharacter = styled.p`
  font-size: 0.85rem;
  margin: 0;
  color: #bbb;
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RecommendationItem = styled.div`
  cursor: pointer;
  transition: transform 0.3s;
  background: rgba(30, 30, 30, 0.7);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(5px);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const RecommendationImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 160px;
  }
`;

const RecommendationTitle = styled.h4`
  font-size: 0.95rem;
  margin: 0.8rem 0.5rem 0.3rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  line-height: 1.3;
`;

const RecommendationRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #ffc107;
`;

const StarSmall = styled.span`
  font-size: 0.9rem;
`;

const NoData = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #999;
  padding: 2rem;
  background: rgba(30, 30, 30, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(5px);
`;

export default Detail;