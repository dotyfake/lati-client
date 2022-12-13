import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const skillsApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://lati-server.onrender.com/api` }),
  endpoints: (builder) => ({
    getSkills: builder.query<any, {slug?: string; page?: number; limit?: number}>({
        query: (payload) => ({
          url: `/skills/${payload.slug}`,
          method: 'GET',
          params: payload
        }),
    }),
    createSkill: builder.mutation({
        query: (payload) => ({
            url: `/skills/createSkill`,
            method: 'POST',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: payload.skillDetail,
      }),
    }),
    editSkill: builder.mutation({
        query: (payload) => ({
            url: `/skills/editSkill`,
            method: 'PATCH',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: payload.skillDetail,
      }),
    }),
    deleteSkill: builder.mutation({
        query: (payload) => ({
            url: `/skills/deleteSkill`,
            method: 'delete',
            headers: {Authorization: `Bearer ${payload.accessToken}`,},
            body: {slug: payload.slug},
      }),
    }),
  }),
})

export const { useCreateSkillMutation, useEditSkillMutation, useDeleteSkillMutation, useGetSkillsQuery } = skillsApi