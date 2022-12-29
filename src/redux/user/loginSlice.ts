import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setError } from 'utils/error';
import { PostType } from 'utils/interfaces';
import axiosPublic from '../../utils/axiosPublic';
import { Socket } from 'socket.io-client';

type User = {
  username: string;
  password: string;
};

export interface UserInfo {
  id: string;
  username: string;
  displayName: string;
  avatar: string | any;
  accessToken: string;
  age: number;
  bio: string;
  gender: string;
  photos: any[];
  skills: any[];
  posts: PostType[];
  follower: string[];
  following: string[];
  success: boolean;
  message: string;
  coin: number;
};

export interface UserSliceState {
  userInfo?: UserInfo | null;
  onlineUsers?: [{userId: string, socketId: string}] | [];
  showAuthForm?: any;
  loading: boolean;
  error: null | any;
  socket?: any;

}

export const initialState: UserSliceState = {
  userInfo: null,
  onlineUsers: [],
  showAuthForm: null,
  loading: false,
  error: null,
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async (user: User, thunkAPI) => {
    try {
      const res = await axiosPublic.post('/auth/login', user);
      if (res.data) {
        toast.success(`${res.data?.message}`)
        return res.data;
      }
    } catch (error: any) {
      const message = setError(error);
      toast.error(message)
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginSlice = createSlice({
  name: 'auth-login',
  initialState,
  reducers: {
    userLogout: (state: UserSliceState) => {
      state.userInfo = null;
    },
    setUserInfo: (state: UserSliceState, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setSocket: (state: UserSliceState, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
    setShowAuthForm: (state: UserSliceState, action: PayloadAction<any>) => {
      state.showAuthForm = action.payload;
    },
    setOnlineUsers: (state: UserSliceState, action: PayloadAction<[{userId: string, socketId: string}]>) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { userLogout, setUserInfo, setOnlineUsers, setShowAuthForm, setSocket } = loginSlice.actions;

export default loginSlice;