import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { workerAPI } from "../services/WorkersServices";


export const rootReducer = combineReducers({
    [workerAPI.reducerPath]: workerAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(workerAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']