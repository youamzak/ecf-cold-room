import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL + "api/user/";

export const signIn = createAsyncThunk(
  "user/login",
  async (loginInfos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}signIn`, loginInfos, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${serverUrl}signOut`, null, {
        withCredentials: true,
      });
      return true;
    } catch (err) {
      console.log("Logout :", err);
      return false;
    }
  }
);

export const verifyToken = createAsyncThunk(
  "user/token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}jwtid`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isError: false,
  errorMessage: {},
  user: {},
}

const userSlice = createSlice({
  name: "user",
  initialState ,
  reducers: {
    resetState : (state, action ) => {
      state = initialState;
      return state;
    }
  },
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isError = false;
      return state;
    },
    [signIn.rejected]: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [verifyToken.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isError = false;
      return state;
    },
    [verifyToken.rejected]: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      state.isError = false;
      state.errorMessage = "";
      return state;
    },
    [logout.fulfilled]: (state, action) => {
      state = initialState;
      return state;
    },
    
  },
});

export const getUserInfos = (state) => state.user.user;
export const getAuthentication = (state) => state.user.isAuthenticated;
export const getError = (state) => state.user.isError;
export const getErrorMessage = (state) => state.user.errorMessage;

export const {resetState} = userSlice.actions

export default userSlice;
