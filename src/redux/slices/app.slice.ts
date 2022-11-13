import {createSlice} from '@reduxjs/toolkit';
import {loadAppTrips} from '@redux/actions/app.actions';

export interface AppSliceState {
  trips: Trip[];
}

const initialState: AppSliceState = {
  trips: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadAppTrips.fulfilled, (state, action) => {
      state.trips = action.payload.trips;
    });
  },
});

export const {} = appSlice.actions;

export default appSlice.reducer;
