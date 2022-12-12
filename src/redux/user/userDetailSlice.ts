import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
<<<<<<< HEAD
  baseQuery: fetchBaseQuery({ baseUrl: 'https://lati-server.onrender.com/api' }),
=======
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_PUBLIC_URL_HTTPS}/api` }),
>>>>>>> dev
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