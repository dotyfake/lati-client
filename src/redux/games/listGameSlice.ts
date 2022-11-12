import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GameType } from 'utils/interfaces';
import axiosPublic from 'utils/axiosPublic';
import { setError } from 'utils/error';

export interface ListGameState {
    listGame: GameType[];
    loading: boolean;
    error: null | object;
  }
  

const listGame: GameType[] | [] = [];

const initialState: ListGameState = {
  listGame: listGame,
  loading: false,
  error: null,
};

export const getListGame = createAsyncThunk('games', async () => {
    try {
      const { data } = await axiosPublic.get('games');
      return data;
    } catch (error: any) {
      const message = setError(error);
      console.log(message);
    }
  });
  
  export const listGameSlice = createSlice({
    name: 'list-game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getListGame.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getListGame.fulfilled, (state, action) => {
        state.loading = false;
        state.listGame = action.payload;
      });
      builder.addCase(getListGame.rejected, (state) => {
        state.loading = false;
      });
    },
  });
  
  export default listGameSlice;