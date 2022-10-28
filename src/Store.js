import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./features/auth/authSlice";
import loading from "./features/loading/loadingSlice";
const reducer = combineReducers({
  auth,
  loading,
});

const Store = configureStore({
  reducer,
});

export default Store;
