import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getChatId: builder.mutation({
        query: (payload) => ({
          url: `/chat/getChatId/${payload.receiverId}`,
          method: 'GET',
          headers: {Authorization: `Bearer ${payload.accessToken}`,},
        }),
    }),
    getChats: builder.mutation({
        query: (accessToken) => ({
          url: `/chat/getChats`,
          method: 'GET',
          headers: {Authorization: `Bearer ${accessToken}`,},
        }),
    }),
    createChat: builder.mutation({
        query: (payload) => ({
            url: `/chat/createChat?receiverId=${payload.receiverId}`,
            method: 'POST',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
      }),
    }),
    sendMessage: builder.mutation({
        query: (payload) => ({
            url: `/chat/sendMessage`,
            method: 'POST',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: {
              chatId: payload.chatId,
              text: payload.text,
            }
      }),
    }),
    getMessages: builder.mutation({
        query: (payload) => ({
            url: `/chat/getMessages/${payload.chatId}`,
            method: 'GET',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
      }),
    }),
  }),
})

export const { 
  useGetChatIdMutation,
  useGetChatsMutation,
  useCreateChatMutation, 
  useSendMessageMutation,
  useGetMessagesMutation,
} = chatApi