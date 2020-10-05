import { configureStore } from '@reduxjs/toolkit';
import ticketsSlice from './ticketsSlice';

export default configureStore({
  reducer: {
    tickets: ticketsSlice,
  },
});
