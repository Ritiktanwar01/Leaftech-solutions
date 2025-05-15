import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import dashboardReducer from "./slices/dashboardSlice"
import aboutReducer from "./slices/aboutSlice"
import projectsReducer from "./slices/projectsSlice"
import enquiriesReducer from "./slices/enquiriesSlice"
import contactReducer from "./slices/contactSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    about: aboutReducer,
    projects: projectsReducer,
    enquiries: enquiriesReducer,
    contact: contactReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
