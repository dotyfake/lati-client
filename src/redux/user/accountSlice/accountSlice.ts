import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lati-server.onrender.com/api/' }),
  endpoints: (builder) => ({
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


export const { useUpdateUserMutation, useUpdateUserFollowingMutation } = accountApi