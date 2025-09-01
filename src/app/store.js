import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/user/userSlice';
import movieReducer from '../features/movies/moviesSlice';

const store = configureStore({
  reducer: {
    user: counterReducer,
    movies: movieReducer
  }
});

export default store;