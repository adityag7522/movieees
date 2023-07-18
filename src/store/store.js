import {configureStore} from '@reduxjs/toolkit';
import moviesSlice from './homeSlice';

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
    },
});