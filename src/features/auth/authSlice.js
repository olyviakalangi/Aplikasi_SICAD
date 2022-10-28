import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userInfo: null,
  verificationId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },
    setVerificationId: (state, action) => {
      state.verificationId = action.payload;
    },
    onStateChange(state) {
      state.stateChange = !state.stateChange;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAccessToken,
  setUserInfo,
  logout,
  setVerificationId,
  onStateChange,
} = authSlice.actions;

export default authSlice.reducer;
