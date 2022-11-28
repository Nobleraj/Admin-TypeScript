import { combineReducers,configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import type { PreloadedState } from '@reduxjs/toolkit'
const rootReducer = combineReducers({
    user: userSlice
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
