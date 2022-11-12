import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lati-server.onrender.com/' }),
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
        query: (userId) => ({
          url: `user/${userId}`,
          method: "GET",
        }),
    }),
  }),
})

export const {useGetUserQuery } = userApi