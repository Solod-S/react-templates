import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import authSlice from './auth/authSlice'
import appDataSlice from './appData/appDataSlice'

const authPersistConfig = {
  key: 'auth',
  storage,
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    appData: appDataSlice,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  },
})

export const persistor = persistStore(store)
