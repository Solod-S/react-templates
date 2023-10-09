import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../service/API/AuthUserAPI'

export const registrationByEmail = createAsyncThunk(
  'auth/email-registration',
  async (credentials, thunkAPI) => {
    try {
      const data = await api.registrationByEmail(credentials)

      return data
    } catch (error) {
      console.log(error.message)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logIn = createAsyncThunk(
  'auth/login',
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

export const googleLogIn = createAsyncThunk(
  'auth/google-login',
  async (credentials, thunkAPI) => {
    try {
      console.log(`!!`)
      const data = await api.googleLogIn(credentials)
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
