import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = process.env.REACT_APP_SERVER_URL + "api/coldRoom/";

export const createColdRoom = createAsyncThunk(
  "coldRoom/createColdRoom",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverUrl}createColdRoom`,
        infos,
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

export const getColdRooms = createAsyncThunk(
  "coldRoom/getColdRoom",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}getColdRooms`,
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

export const getColdRoomMeasurement = createAsyncThunk(
  "coldRoom/getColdRoomMeasurement",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}getColdRoomMeasurement`, infos, {
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

export const switchValidationDayColdroom = createAsyncThunk(
  "coldRoom/switchValidationDayColdroom",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}switchValidationDayColdroom`, infos, {
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

export const addMesurementToColdroom = createAsyncThunk(
  "coldRoom/addMesurementToColdroom",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverUrl}addMeasure`, infos, {
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

export const getOfficineColdRooms = createAsyncThunk(
  "coldRoom/getOfficineColdRoomsInfos",
  async (infos, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverUrl}getOfficineColdRooms`,
        infos,
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
  isError: false,
  isSuccess: false,
  errorMessage: {},
  coldRooms: [],
  measure: [],
};

const coldRoomSlice = createSlice({
  name: "coldroom",
  initialState,
  reducers: {
    resetState: (state, action) => {
      state = initialState;
      return state;
    },
    setColdRooms: (state, action) => {
      state.coldRooms = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
  },
  extraReducers: {
    [addMesurementToColdroom.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [addMesurementToColdroom.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload;
      return state;
    },
    [createColdRoom.fulfilled]: (state, action) => {
      state.coldRooms = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [createColdRoom.rejected]: (state, action) => {
      state.coldRooms = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [getColdRooms.fulfilled]: (state, action) => {
      state.coldRooms = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [getColdRooms.rejected]: (state, action) => {
      state.coldRooms = [];
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [getOfficineColdRooms.fulfilled]: (state, action) => {
      state.coldRooms = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [getOfficineColdRooms.rejected]: (state, action) => {
      state.coldRooms = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [getColdRoomMeasurement.fulfilled]: (state, action) => {
      state.measure = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [getColdRoomMeasurement.rejected]: (state, action) => {
      state.measure = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
    [switchValidationDayColdroom.fulfilled]: (state, action) => {
      state.measure = action.payload;
      state.isError = false;
      state.errorMessage = {};
      return state;
    },
    [switchValidationDayColdroom.rejected]: (state, action) => {
      state.measure = {};
      state.isError = true;
      state.errorMessage = action.payload.err;
      return state;
    },
  },
});

// export const getColdRoomsInfos = (state) => state.officine.officines;

export const { resetState, setColdRooms } = coldRoomSlice.actions;

export default coldRoomSlice;
