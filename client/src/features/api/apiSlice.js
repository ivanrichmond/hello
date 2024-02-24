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
              createUser(input: {
                    name: \"${user?.name}\",
                    username: \"${user?.username}\",
                    createdAt: ${user?.createdAt},
                    error: \"${user?.error}\",
              }) {
                error
                payload {
                  _id
                  createdAt
                  name
                  username
                }
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
              error
              payload {
                _id
                createdAt
                name
                username
              }
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
              error
              payload {
                _id
                createdAt
                name
                username
              }
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
              error
              payload {
                _id
                createdAt
                name
                username
              }
            }
          }
        `
      }),
      providesTags: ['User'],
    }),
    updateCurrentUser: builder.mutation({
      query: currentUser => ({
        // Unlike users, currentUser needs the _id, because it's a foreign key to users.
        body: gql`
          mutation {
            updateCurrentUser(input: {
                _id: \"${currentUser?._id}\",
                createdAt: ${currentUser?.createdAt},
                name: \"${currentUser?.name}\",
                username: \"${currentUser?.username}\",
                password: \"${currentUser?.password}\",
            }) {
              error
              payload {
                _id
                createdAt
                name
                username
              }
            }
          }
        `,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
    updateUser: builder.mutation({
      query: user => ({
        body: gql`
          mutation {
            updateUser(input: {
                  name: \"${user?.name}\",
                  username: \"${user?.username}\",
                  password: \"${user?.password}\"
            }) {
              error
              payload {
                _id
                createdAt
                name
                username
              }
            }
          }
        `
      }),
      invalidatesTags: ['User'],
    }),
    //TODO: I had to make this as a mutation, because hooks can't be called conditionally.
    // Queries happen instantly, but mutations can be received, via hooks, and then executed conditionally. 
    isUserValid: builder.mutation({
      query: (user) => ({
        body: gql`
          query {
            validateUser(input: {
              username: \"${user?.username}\", 
              password: \"${user?.password}\"
            } ) {
              error
              payload
            }
          }
        `,
      }),
      invalidatesTags: ['User'],
    }),
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
  useIsUserValidMutation,
} = apiSlice