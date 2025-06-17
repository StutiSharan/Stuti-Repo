import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async () => {

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`);
    const details = await Promise.all(
      res.data.results.map(p => axios.get(p.url).then(res => res.data))
    );
    return details;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch Pokemon.";
      });
  },
});

export default pokemonSlice.reducer;
