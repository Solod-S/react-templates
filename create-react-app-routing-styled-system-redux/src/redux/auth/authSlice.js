import { createSlice } from '@reduxjs/toolkit'
import * as authOperation from '../auth/authOperation'

const initialState = {
  user: {},
  isloggedIn: false,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(authOperation.logIn.fulfilled, (state, action) => {
        const { payload } = action
        state.user = payload
        state.isloggedIn = true
      })
      .addCase(authOperation.logOut.fulfilled, (state, _) => {
        state.user = {}
        state.isloggedIn = false
      })
      .addCase(authOperation.fetchCurrentUser.fulfilled, (state, action) => {
        const { payload } = action
        state.user = payload
        state.isloggedIn = true
      })
      .addCase(authOperation.logIn.rejected, (state, _) => {
        state.user = {}
        state.isloggedIn = false
      })
      .addCase(authOperation.logOut.rejected, (state, _) => {
        state.user = {}
        state.isloggedIn = false
      })
  },
})

export default AuthSlice.reducer
export const { sessionRefresh } = AuthSlice.actions
