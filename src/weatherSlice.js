import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch weather data for Seattle from Open-Meteo
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async () => {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=47.61&longitude=-122.33&current_weather=true'
    );
    const data = await res.json();
    return data.current_weather
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
