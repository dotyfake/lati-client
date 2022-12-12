import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.PUBLIC_URL_HTTPS}/api` }),
  endpoints: (builder) => ({
    getFollowingUser: builder.mutation({
        query: (accessToken) => ({
            url: `/account/getFollowingUser`,
            method: 'GET',
            headers: {Authorization: `Bearer ${accessToken}`,},
      }),
    }),
    updateUser: builder.mutation({
        query: (payload) => ({
            url: `/account/updateUser`,
            method: 'PATCH',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: payload,
      }),
    }),
    updateUserFollowing: builder.mutation<any, {action: string, followingUserId: string, accessToken: string}>({
        query: (payload) => ({
            url: `/account/updateFollowingUser?action=${payload.action}&followingUserId=${payload.followingUserId}`,
            method: 'PATCH',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
      }),
    }),
  }),
})


export const { useUpdateUserMutation, useUpdateUserFollowingMutation, useGetFollowingUserMutation } = accountApi