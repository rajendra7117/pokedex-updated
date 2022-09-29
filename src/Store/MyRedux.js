import { configureStore } from "@reduxjs/toolkit";
import pokemonInfoSlice from "./PokemonInfoSlice";
import randomPokemonSlice from "./pokemons/random";
import searchSlice from "./search/pokemonSearch";


const store = configureStore({
    reducer:{
        pokemonInfoSlice: pokemonInfoSlice.reducer,
        random: randomPokemonSlice.reducer,
        search: searchSlice.reducer
    }
})

export default store;