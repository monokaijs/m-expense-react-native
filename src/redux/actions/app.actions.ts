import {createAsyncThunk} from '@reduxjs/toolkit';
import {StorageService} from '@services/StorageService';

export const loadAppTrips = createAsyncThunk(
  'app/load-trips',
  async (query: string = '') => {
    const allTrips = await StorageService.getAllTrips(query);
    return {
      trips: allTrips,
    };
  },
);
