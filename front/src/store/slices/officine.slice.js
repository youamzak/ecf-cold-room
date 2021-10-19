import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL + "api/officine/";

export const createOfficine = createAsyncThunk(
  "officine/create",
  async (createInfos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}createOfficine`, createInfos, {
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

export const addColdRoomToOfficine = createAsyncThunk(
  "officine/addColdRoom",
  async (addColdRoomInfos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}addColdRoomToOfficine`, addColdRoomInfos, {
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

export const addUserToOfficine = createAsyncThunk(
  "officine/addUser",
  async (addUserInfos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}addUserToOfficine`, addUserInfos, {
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

export const getOfficines = createAsyncThunk(
  "officine/getOfficines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}getOfficines`,  {
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

export const getOwnerOfficines = createAsyncThunk(
  "officine/getOwnerOfficines",
  async (getOwnerOfficinesInfos, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverUrl}getOwnerOfficines`, getOwnerOfficinesInfos, {
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
  isError: false,
  isSuccess: false,
  errorMessage: {},
  officines: [],
}

const officineSlice = createSlice({
  name: "officine",
  initialState,
  reducers: {
    resetState : (state, action ) => {
      state = initialState;
      return state;
    }
  },
  extraReducers: {
    [createOfficine.fulfilled]: (state, action) => {
      state.officines = action.payload;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [createOfficine.rejected]: (state, action) => {
      state.officines = {};
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [addColdRoomToOfficine.fulfilled]: (state, action) => {
      state.officines = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [addColdRoomToOfficine.rejected]: (state, action) => {
      state.officines = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [addUserToOfficine.fulfilled]: (state, action) => {
      state.officines = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [addUserToOfficine.rejected]: (state, action) => {
      state.officines = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [getOfficines.fulfilled]: (state, action) => {
      state.officines = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [getOfficines.rejected]: (state, action) => {
      state.officines = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [getOwnerOfficines.fulfilled]: (state, action) => {
      state.officines = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [getOwnerOfficines.rejected]: (state, action) => {
      state.officines = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
  }
});

export const getOfficinesInfos = (state) => state.officine.officines;

export const {resetState} = officineSlice.actions

export default officineSlice;
