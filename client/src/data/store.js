import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../features/api/apiSlice'
import usersReducer from '../data/usersSlice'

export default configureStore({
  reducer: {
      users: usersReducer,
      [apiSlice.reducerPath]: apiSlice.reducer
  }
})