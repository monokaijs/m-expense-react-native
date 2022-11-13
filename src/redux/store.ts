import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appSlice, AppSliceState} from '@redux/slices/app.slice';
import {authSlice, AuthSliceState} from '@redux/slices/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
const authPersistedReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer,
);

const reducers = combineReducers({
  auth: authPersistedReducer,
  app: appSlice.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    timeout: 100000,
    whitelist: ['auth'],
  },
  reducers,
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

export interface RootState {
  app: AppSliceState;
  auth: AuthSliceState;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
