import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setError } from 'utils/error';
import axiosPublic from '../../utils/axiosPublic';
import { initialState, setUserInfo } from './loginSlice';
type User = {
  username: string;
  password: string;
  displayName: string;
};

export const userRegister = createAsyncThunk(
  'auth/register',
  async (user: User, thunkAPI) => {
    try {
      const res = await axiosPublic.post('/auth/register', user);
      if (res.data) {
        toast.success(`${res.data?.message}`)
        thunkAPI.dispatch(setUserInfo(res.data))
      }
    } catch (error: any) {
      const message = setError(error);
      toast.error(message)
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerSlice = createSlice({
  name: 'auth-register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.loading = false;
    });
  },
});


export default registerSlice;