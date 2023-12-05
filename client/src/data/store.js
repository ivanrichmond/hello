import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../data/usersSlice'

export default configureStore({
  reducer: {
      users: usersReducer
  }
})