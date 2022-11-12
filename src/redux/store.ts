import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import listGameSlice from './games/listGameSlice';
import loginSlice from './user/loginSlice';
import postsSlice from './posts/postsSlice';
import { accountApi } from './user/accountSlice/accountSlice';
import { skillsApi } from './skills/skillsSlice';
import { postsApi } from './posts/postSlice';
import { userApi } from './user/userDetailSlice';

const reducers = combineReducers({
listGame: listGameSlice.reducer,
login: loginSlice.reducer,
posts: postsSlice.reducer,
[userApi.reducerPath]: userApi.reducer,
[accountApi.reducerPath]: accountApi.reducer,
[skillsApi.reducerPath]: skillsApi.reducer,
[postsApi.reducerPath]: postsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['skillsApi','userApi','postsApi','accountApi', 'posts'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
