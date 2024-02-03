// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  mode: "cors",
  tagTypes: ['CurrentUser', 'User'],
  endpoints: builder => ({
    addUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteCurrentUser: builder.mutation({
      query: () => ({
        url: `/currentUser`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CurrentUser'],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => '/currentUser',
      providesTags: ['CurrentUser'],
    }),
    getUser: builder.query({
      query: id => `/users/${id}`,
      providesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: user => ({
        url: `/users/${user._id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateCurrentUser: builder.mutation({
      query: currentUser => ({
        url: '/currentUser',
        method: 'POST',
        body: currentUser,
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