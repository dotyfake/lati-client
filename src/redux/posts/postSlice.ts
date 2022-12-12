import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.PUBLIC_URL_HTTPS}/api` }),
  endpoints: (builder) => ({
    getPosts: builder.query<any, { page?: number; limit?: number, following?: string, profile?: string, newPosts?: string}>({
        query: (payload) => ({
          url: `/posts/getPosts`,
          method: 'GET',
          params: payload
        }),
    }),
    createPost: builder.mutation({
        query: (payload) => ({
            url: `/posts/createPost`,
            method: 'POST',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: payload,
      }),
    }),
    updateLike: builder.mutation({
        query: (payload) => ({
            url: `/posts/updateLike`,
            method: 'PATCH',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: payload,
      }),
  }),
  createComment: builder.mutation({
        query: (payload) => ({
            url: `/posts/createComment`,
            method: 'POST',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: payload,
      }),
    }),
  }),
})

export const { 
  useCreatePostMutation, 
  useGetPostsQuery, 
  useCreateCommentMutation, 
  useUpdateLikeMutation ,
} = postsApi