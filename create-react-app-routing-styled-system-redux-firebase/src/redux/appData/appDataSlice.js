import { createSlice } from '@reduxjs/toolkit'
import * as appDataOperation from '../appData/appDataOperation'

const initialState = {
  subscriptions: [],
}

const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    clearSubscription: state => {
      state.subscriptions = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        appDataOperation.fetchSubscription.fulfilled,
        (state, action) => {
          const { payload } = action
          state.subscriptions = payload
        }
      )
      .addCase(appDataOperation.fetchSubscription.rejected, (state, _) => {
        state.subscriptions = []
      })
  },
})

export default appDataSlice.reducer
export const { clearSubscription } = appDataSlice.actions
