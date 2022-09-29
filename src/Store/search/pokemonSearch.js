import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
const initialState = {loading: false, pokemon: {}, error: ''}

export const searchPokemon = createAsyncThunk('pokemon/search', async(query) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}/`)
   if(response.status!==200){
    return response
   }
    return response.data
})
const searchSlice = createSlice({
    name: 'search',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(searchPokemon.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(searchPokemon.fulfilled, (state, action) => {
          
            state.error= ''
            state.loading = false 
            state.pokemon = action.payload
        })
        builder.addCase(searchPokemon.rejected, (state, action) => {

            state.loading = false 
            console.log(action.error)
            state.error = action.error.message
        })
    }
})

export default  searchSlice;