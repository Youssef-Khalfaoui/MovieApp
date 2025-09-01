import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import TVShows from "./Components/TVShows";
import Movies from "./Components/Movies";
import Animations from "./Components/Animations";
import More from "./Components/More"; // Import the More component
import SearchResults from './Components/SearchResults';
import Detail from "./Components/Details";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/animations" element={<Animations />} />
        <Route path="/more/:category" element={<More />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;