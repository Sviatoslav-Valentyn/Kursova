import { combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import auth from "./authSlice";
import pharmacies from "./pharmaciesSlice";


const rootReducer = combineReducers({
    auth, pharmacies
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            // Ignore all action types
            ignoredActions: [],
            // Ignore all field paths in all actions
            ignoredActionPaths: [],
            // Ignore all paths in the state
            ignoredPaths: [],
        }
    })
}) 