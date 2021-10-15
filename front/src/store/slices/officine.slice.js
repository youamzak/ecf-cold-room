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

const officineSlice = createSlice({
  name: "officine",
  initialState: {
    officines: {},
  },
  reducers: {
    setColdRoomInfo: (state, action) => {
      state.coldRoom = action.payload;
    },
    resetColdRoomInfo: (state, action) => {
      return {
        ...state,
        coldRoom: null,
      };
    },
  },
});

export default officineSlice;
