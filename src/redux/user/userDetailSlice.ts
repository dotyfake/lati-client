import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
        query: (userId) => ({
          url: `user/${userId}`,
          method: "GET",
        }),
    }),
    getAllUser: builder.query<any, {page?: number; limit?: number}>({
        query: (payload) => ({
          url: `user/allUser`,
          method: "GET",
          params: payload
        }),
    }),
  }),
})

export const {useGetUserQuery, useGetAllUserQuery } = userApi