// Import the RTK Query methods from the React-specific entry point
import { createApi } from '@reduxjs/toolkit/query/react'
import { request, gql } from 'graphql-request'

import config from '../../config.json';

const graphqlBaseQuery = ({ baseUrl }) => async ({ body }) => {
    try {
      const result = await request(baseUrl, body)
      return { data: result }
    } catch (error) {
      console.error(`GRAPHQL ERROR: ${error}`)
    }
}

const baseUrl = `${config?.httpProtocol || 'http'}://${config?.domain || 'localhost'}:${config?.graphQLPort || 4000}` // Ex. http://localhost:4000

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({ baseUrl }),
  mode: "cors",
  tagTypes: ['CurrentUser', 'User'],
  endpoints: builder => ({
    addUser: builder.mutation({
      query: (user) => ({
        body: gql`
          mutation {
              createUser(input: ${user}) {
                _id
                createdAt
                error
                name
                username
              }
          }
        `,
      }),
      invalidatesTags: ['User'],
    }),
    deleteCurrentUser: builder.mutation({
      query: () => ({
        body: gql`
          mutation {
            deleteCurrentUser {
              error
              id
              removed
            }
          }
        `,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        body: gql`
          mutation {
            deleteUser(input: ${id}) {
              error
              id
              removed
            }
          }
        `,
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        body: gql`
          query {
            getCurrentUser {
              _id
              createdAt
              error
              name
              username
            }
          }
        `
      }),
      providesTags: ['CurrentUser'],
    }),
    getUser: builder.query({
      query: (id) => ({
        body: gql`
          query($input) {
            getUser(input: ${id}) {
              _id
              createdAt
              error
              name
              username
            }
          }
        `,
      }),
      providesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => ({
        body: gql`
          query {
            findUsers {
              users {
                error
                name
                username
                createdAt
              }
            }
          }
        `
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: user => ({
        body: gql`
          updateUser(input: ${user}) {
            _id
            createdAt
            error
            name
            username
          }
        `
      }),
      invalidatesTags: ['User'],
    }),
    updateCurrentUser: builder.mutation({
      query: currentUser => ({
        body: gql`
          mutation {
            updateCurrentUser(input: ${currentUser}) {
              _id
              createdAt
              error
              name
              username
            }
          }
        `,
      }),
      invalidatesTags: ['CurrentUser'],
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useAddUserMutation,
  useDeleteCurrentUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUpdateCurrentUserMutation,
} = apiSlice