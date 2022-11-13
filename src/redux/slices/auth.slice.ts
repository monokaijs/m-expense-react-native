import {createSlice} from '@reduxjs/toolkit';
import {User} from '@react-native-google-signin/google-signin';
import {doAuth} from '@redux/actions/auth.actions';

export interface AuthSliceState {
  isSignedIn: boolean;
  account?: User['user'];
}

const initialState: AuthSliceState = {
  isSignedIn: false,
};

export const authSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(doAuth.fulfilled, (state, action) => {
      state.isSignedIn = true;
      state.account = action.payload.user;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
