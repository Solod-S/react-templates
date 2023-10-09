import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/API/SubscriptionsAPI'

export const fetchSubscription = createAsyncThunk(
  'subscriptions/',
  async (_, thunkAPI) => {
    try {
      const data = await api.fetchSubscription()
      return data
    } catch (error) {
      console.log(error.message)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
