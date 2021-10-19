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

export const signUp = createAsyncThunk(
  "user/register",
  async (loginInfos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}signUp`, loginInfos, {
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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}getUser`, infos, {
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

export const updatePassword = createAsyncThunk(
  "user/update",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}updatePassword`, infos, {
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
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}jwtid`,
        {
          withCredentials: true,
        }
      );
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
  isLoggedIn: false,
  isError: false,
  errorMessage: {},
  isOfficine: false,
  userList: [],
  isCreated: false,
  user: {
    _id: "",
    login: "",
    password: null,
    role: "",
    officine: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state, action) => {
      state = initialState;
      return state;
    },
    resetInfos: (state, action) => {
      state.isError = false;
      state.isCreated = false;
      return state;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.userList = action.payload;
      return state;
    },
    [getUser.rejected]: (state, action) => {
      state.userList = [];
      return state;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isCreated = true;
      state.isError = false;
      return state;
    },
    [signUp.rejected]: (state, action) => {
      state.isCreated = false;
      state.isError = true;
      return state;
    },
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = false;
      state.isLoggedIn = true;
      state.isError = false;
      state.isOfficine = action.payload.officine.length !== 0;
      state.errorMessage = {};
      return state;
    },
    [signIn.rejected]: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [verifyToken.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [verifyToken.rejected]: (state, action) => {
      state.user = {};
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.isError = false;
      state.errorMessage = action.payload.err;
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
export const getIsOfficine = (state) => state.user.isOfficine;
export const getErrorMessage = (state) => state.user.errorMessage;
export const getUserOfficines = (state) => state.user.user.officine;
export const getUserColdRooms = (state) => {
  if (state.user.user.officine.length > 0)
    return state.user.user.officine[0].coldRooms;
  else return [];
};

export const { resetState, resetInfos } = userSlice.actions;

export default userSlice;
