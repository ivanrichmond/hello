import { createSlice } from '@reduxjs/toolkit'

export const findUser = (users, id) => {
    return users.findIndex(user => user.id === id)
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentUser: null
  },
  reducers: {
    // payload: none
    addUser: (state, action) => {
        state.users.push(action.payload)
    },
    // payload: {id}
    deleteUser: (state, action) => {
        const index = findUser(state.users, action.payload.id)
        state.users.splice(index,1)
    },
    // payload: {id, newUser}
    updateUser: (state, action) => {
        const index = findUser(state.users, action.payload.id)
        state.users[index] = action.payload.newUser
    },
    designateCurrentUser: (state, action) => {
        state.currentUser = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { 
  addUser, 
  deleteUser, 
  updateUser, 
  designateCurrentUser 
} = usersSlice.actions

export default usersSlice.reducer