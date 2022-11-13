import {createAsyncThunk} from '@reduxjs/toolkit';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const doAuth = createAsyncThunk('auth/do-auth', async _ => {
  await GoogleSignin.hasPlayServices();
  const authResponse = await GoogleSignin.signIn();
  return {
    user: authResponse.user,
  };
});
