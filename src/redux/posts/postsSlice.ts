import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from 'utils/interfaces';



export interface PostsSliceState {
postsNew: PostType[] | []
postsFollowing: PostType[] | []
postsProfile: PostType[] | []

}

export const initialState: PostsSliceState = {
    postsNew:  [],
    postsFollowing:  [],
    postsProfile:  [],
};


export const postsSlice = createSlice({
  name: 'auth-login',
  initialState,
  reducers: {
    setPostsNew: (state: PostsSliceState, action: PayloadAction<PostType[] | []>) => {
      state.postsNew = action.payload;
    },
    setPostsFollowing: (state: PostsSliceState, action: PayloadAction<PostType[] | []>) => {
      state.postsFollowing = action.payload;
    },
    setPostsProfile: (state: PostsSliceState, action: PayloadAction<PostType[] | []>) => {
      state.postsProfile = action.payload;
    },
  },
});

export const { setPostsNew, setPostsFollowing, setPostsProfile } = postsSlice.actions;

export default postsSlice;