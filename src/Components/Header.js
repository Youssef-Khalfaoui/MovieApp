import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import MovieIcon from "@mui/icons-material/Movie";
import CrueltyFreeOutlinedIcon from "@mui/icons-material/CrueltyFreeOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginIcon from "@mui/icons-material/Login";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {
  setUserLoginDetails,
  setSignOutState,
  selectUserName,
  selectUserPhoto,
} from "../features/user/userSlice";

const API_KEY =
  process.env.REACT_APP_TMDB_API_KEY || "7a462e4b142a990b15c01fe69d2b2de9";

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchInputFull, setFull] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
            searchValue
          )}&page=1`
        );
        const data = await response.json();

        const topSuggestions = data.results?.slice(0, 5) || [];
        setSuggestions(topSuggestions);
        setShowSuggestions(topSuggestions.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchContainer = document.querySelector(".search-container");
      if (searchContainer && !searchContainer.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar");
      const navButton = document.querySelector(".nav-button");

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !navButton.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => setUser(result.user))
        .catch((err) => alert(err.message));
    } else {
      signOut(auth)
        .then(() => dispatch(setSignOutState()))
        .catch((err) => alert(err.message));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setFull(value.trim() !== "");
  };

  const clearInput = () => {
    setSearchValue("");
    setFull(false);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
      setFull(false);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const detailRoute =
      suggestion.media_type === "tv"
        ? `/detail/tv/${suggestion.id}`
        : `/detail/movie/${suggestion.id}`;

    navigate(detailRoute);
    setSearchValue("");
    setFull(false);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };
const location = useLocation();
  return (
    <Container $isScrolled={isScrolled}>
      <div>
        <div style={{ display: "flex" }} className="First">
          <Nav className="nav-button" onClick={() => setIsOpen(!isOpen)}>
            <DensityMediumIcon
              style={{ color: "white", cursor: "pointer", fontSize: "30px" }}
            />
          </Nav>
<Link to="/home" style={{ textDecoration: "none" }}>
  <Logo
    onClick={() => {
      if (location.pathname === "/" || location.pathname === "/home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }}
  >
    <img
      src="https://h5-static.aoneroom.com/oneroomStatic/public/_nuxt/web-logo.apJjVir2.svg"
      alt="MovieBox Logo"
    />
    <h2>MovieBox</h2>
  </Logo>
</Link>
        </div>

        <SearchContainer className="search-container">
          <Search onSubmit={handleSearch}>
            <StyledSearchIcon />
            <SearchInput
              placeholder="Search movies/ TV Shows"
              value={searchValue}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <StyledCancelIcon $full={isSearchInputFull} onClick={clearInput} />
          </Search>
          {showSuggestions && (
            <SuggestionsDropdown>
              {isLoadingSuggestions ? (
                <SuggestionItem>
                  <LoadingText>Loading suggestions...</LoadingText>
                </SuggestionItem>
              ) : (
                <>
                  {suggestions.map((suggestion) => (
                    <Link to={`/detail/${suggestion.id}`}>
                      <SuggestionItem
                        key={`${suggestion.id}-${suggestion.media_type}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <SuggestionImage>
                          {suggestion.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                              alt={suggestion.title || suggestion.name}
                            />
                          ) : (
                            <NoImagePlaceholder>No Image</NoImagePlaceholder>
                          )}
                        </SuggestionImage>
                        <SuggestionInfo>
                          <SuggestionTitle>
                            {suggestion.title || suggestion.name}
                          </SuggestionTitle>
                          <SuggestionType>
                            {suggestion.media_type === "tv"
                              ? "TV Show"
                              : "Movie"}
                            {suggestion.release_date &&
                              ` (${new Date(
                                suggestion.release_date
                              ).getFullYear()})`}
                            {suggestion.first_air_date &&
                              ` (${new Date(
                                suggestion.first_air_date
                              ).getFullYear()})`}
                          </SuggestionType>
                        </SuggestionInfo>
                      </SuggestionItem>
                    </Link>
                  ))}
                  <ViewAllResults onClick={handleSearch}>
                    View all results for "{searchValue}"
                  </ViewAllResults>
                </>
              )}
            </SuggestionsDropdown>
          )}
        </SearchContainer>
      </div>

      {userName ? (
        <UserProfile>
          <img src={userPhoto || "/default-avatar.jpg"} alt="User Profile" />
          <SignOutButton className="SignOut" onClick={handleAuth}>
            Sign Out
          </SignOutButton>
        </UserProfile>
      ) : (
        <Button onClick={handleAuth}>
          <span className="text">Login</span>
          <LoginIcon />
        </Button>
      )}

      <Sidebar className="sidebar" $open={isOpen}>
        <SidebarLink to="/home">
          <HomeOutlinedIcon />
          <h3>Home</h3>
        </SidebarLink>
        <SidebarLink to="/tvshows">
          <LiveTvOutlinedIcon />
          <h3>TV show</h3>
        </SidebarLink>
        <SidebarLink to="/movies">
          <MovieIcon />
          <h3>Movie</h3>
        </SidebarLink>
        <SidebarLink to="/animations">
          <CrueltyFreeOutlinedIcon />
          <h3>Animation</h3>
        </SidebarLink>

        <SideBarFooter>
          <SideBarFooterIcons>
            <XIcon className="sidebaricons" onClick={() => setIsOpen(false)} />
            <FacebookOutlinedIcon className="sidebaricons" />
            <WhatsAppIcon className="sidebaricons" />
            <TelegramIcon className="sidebaricons" />
          </SideBarFooterIcons>
          <FooterText>
            <p>moviebox.ng@mbox.ng</p>
            <div>
              <a href="#">Privacy Policy</a> · <a href="#">User Agreement</a>
            </div>
          </FooterText>
        </SideBarFooter>
      </Sidebar>

    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 65px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: ${({ $isScrolled }) =>
    $isScrolled ? "#000000" : "transparent"};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(10px)" : "none"};
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;

  & > div {
    display: flex;
    width: 70%;
    align-items: center;
  }
  @media (max-width: 760px) {
    & > div {
      flex-direction: column;
      width: 100%;
    }
    .First {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin: 0 40px;
  width: 500px;

  @media (max-width: 760px) {
    position: absolute;
    bottom: -60px;
    width: 96%;
    left: -30px;
    margin: 0;
  }
`;

const StyledCancelIcon = styled(CancelIcon)`
  display: ${({ $full }) => ($full ? "block" : "none")} !important;
  color: #b3b3b4;
  cursor: pointer;
`;

const Logo = styled.div`
  display: flex;
  color: white;
  align-items: center;
  cursor: pointer;
  img {
    margin: 0 10px;
  }
  h2 {
    font-size: 20px;
  }
  @media (max-width: 760px) {
    width: 80%;
    margin: 0 150px;
    justify-content: center;
    h2 {
      font-size: 30px;
    }
  }
  @media (max-width: 600px) {
    margin: 0 50px;
  }
  @media (max-width: 400px) {
    margin: 0 10px;
  }
`;

const Search = styled.form`
  padding: 10px 10px;
  background-color: #5a5551;
  display: flex;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  transition: 0.1s linear;
  &:focus-within {
    border: 2px solid white;
  }
  @media (max-width: 700px) {
    background-color: #4041436e;
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #b3b3b4;
  padding-left: 10px;
  width: 90%;
  font-size: 16px;
  @media (max-width: 700px) {
    background-color: transparent;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: #b3b3b4;
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1a1a1a;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 2px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(145deg, #1dd171, #2166e5);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(145deg, #28e085, #3674f0);
  }

  scrollbar-width: thin;
  scrollbar-color: #1dd171 rgba(255, 255, 255, 0.1);
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SuggestionImage = styled.div`
  width: 40px;
  height: 60px;
  margin-right: 10px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 10px;
  border-radius: 4px;
`;

const SuggestionInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SuggestionTitle = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SuggestionType = styled.div`
  color: #b3b3b4;
  font-size: 12px;
`;

const ViewAllResults = styled.div`
  padding: 12px;
  text-align: center;
  color: #1dd171;
  font-weight: 500;
  cursor: pointer;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: rgba(29, 209, 113, 0.1);
  }
`;

const LoadingText = styled.div`
  padding: 12px;
  text-align: center;
  color: #b3b3b4;
  font-size: 14px;
`;

const Nav = styled.div`
  width: 30px;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background-image: linear-gradient(95deg, #2166e5 3.79%, #1dd171 50%);
  border: none;
  outline: none;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 760px) {
    padding: 10px;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 0;
  }
  @media (max-width: 400px) {
    width: 35px;
    height: 35px;
  }
  svg {
    display: none;
    @media (max-width: 760px) {
      display: block;
      color: white;
      font-size: 24px;
    }
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 65px;
  left: 0;
  height: calc(100vh - 65px);
  width: 250px !important;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  align-items: start;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  padding: 15px 20px;
  justify-content: start;
  width: 100%;
  &:hover {
    background-color: #3a3a3a;
    color: #1dd171;
  }
  svg {
    font-size: 20px;
    min-width: 20px;
  }
  h3 {
    margin: 0;
    font-weight: 400;
    font-size: 16px;
  }
`;

const SideBarFooter = styled.div`
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid #3a3a3a;
  width: 100%;
`;

const SideBarFooterIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  gap: 8px;
  .sidebaricons {
    color: #ffffff;
    width: 28px;
    height: 28px;
    background-color: #4a4a4a;
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
    &:hover {
      background-color: #5a5a5a;
    }
  }
`;

const FooterText = styled.div`
  color: #b3b3b4;
  font-size: 12px;
  text-align: center;
  p {
    margin: 0 0 8px 0;
  }
  div {
    line-height: 1.4;
  }
  a {
    color: #b3b3b4;
    text-decoration: none;
    &:hover {
      color: #1dd171;
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    right: 0;
    top: -20px;
  }
  @media (max-width: 650px) {
    &:hover .SignOut {
      display: block;
    }
  }
`;

const SignOutButton = styled.span`
  position: absolute;
  top: -10px;
  right: 60px;
  white-space: nowrap;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  transition: 0.2s;
  z-index: 1001;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  @media (max-width: 650px) {
    & {
      display: none;
      top: 30px;
      right: 0;
    }
  }
`;

export default Header;
