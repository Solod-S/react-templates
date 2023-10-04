import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/API/AuthUserAPI'

export const logIn = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const data = await api.logIn(credentials)

      return data
    } catch (error) {
      console.log(error.message)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    await api.logOut()
  } catch (error) {
    console.log(error.message)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      await api.fetchCurrentUser()
    } catch (error) {
      console.log(error.message)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
