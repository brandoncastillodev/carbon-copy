import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userState";
import favReducer from "./favState";

const store = configureStore({
  reducer: {
    user: userReducer,
    fav: favReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;