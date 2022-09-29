import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  loading: false,
  pokemons: [],
  nextUrl: "",
  previousUrl: "",
  error: "",
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (url) => {
 
    const response = await axios.get(url);
    if(response.status!==200){
      return response
    }
    return response.data
  }
);
const randomPokemonSlice = createSlice({
  name: "random pokemons",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
     
      state.loading = true;
      state.error = ''
      
    });

    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
    
      state.loading = false;
     
      state.error = ''
      state.pokemons = action.payload.results;
      state.nextUrl = action.payload.next;
      state.previousUrl = action.payload.previous
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
   
      state.loading = false;
      state.pokemons = [];
      state.error = action.error.message;
   
    });
  },
});

export const randomPokemonSliceActions = randomPokemonSlice.actions;

export default randomPokemonSlice;
