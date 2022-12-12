import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatType } from 'utils/interfaces';


export interface ChatSliceState {
    listChat?: ChatType[] | [];
    currentChat?: ChatType | null;
}

export const initialState: ChatSliceState = {
    listChat: [],
    currentChat: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setListChat: (state: ChatSliceState, action: PayloadAction<ChatType[]>) => {
      state.listChat = action.payload;
    },
    
    setCurrentChat: (state: ChatSliceState, action: PayloadAction<ChatType>) => {
      state.currentChat= action.payload;
    },
    
  },
  extraReducers: () => {},
});

export const { setListChat,setCurrentChat } = chatSlice.actions;

export default chatSlice;
