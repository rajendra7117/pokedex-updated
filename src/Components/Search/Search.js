import React, { useEffect, useState } from "react";
import ErrorCard from "../GeneralComponets/ErrorCard";
import "./Search.css";
import Pokeball from "../GeneralComponets/Pokeball";
import PokemonCard from "../GeneralComponets/PokemonCard";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../../Store/search/pokemonSearch";
import { useSelector } from "react-redux";
export default function Search() {
  const [enteredInput, setEnteredInput] = useState("");
  const dispatch = useDispatch();


  const pokemonInfo = useSelector((state) => state.search);
  const [searchStarted, setSearchStarted] = useState(false);
  const inputHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setEnteredInput(e.target.value);
    setSearchStarted(false)
  };
  const onSubmit = (e) => {
    e.preventDefault();
  

    dispatch(searchPokemon(enteredInput.toLocaleLowerCase()));
    setSearchStarted(true);
  };

  console.log(pokemonInfo);

  return (
    <motion.div
      className="container search-container"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <div>
        <h4>Find a Pokemon</h4>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="search for a pokemon"
            onChange={inputHandler}
          />
          <button>Search</button>
        </div>
      </form>

      {searchStarted && (
        <>
          {pokemonInfo.error!=='' ? (
            <>
              <ErrorCard message={"pokemon not found"} />
            </>
          ) : (
            <>
              {pokemonInfo.loading ? (
                <Pokeball />
              ) : (
                <>
                  {" "}
                  {pokemonInfo.pokemon && (
                    <div className="container search-card">
                      <PokemonCard
                        img={
                          pokemonInfo.pokemon.sprites.other.dream_world
                            .front_default
                        }
                        name={pokemonInfo.pokemon.name}
                        pokemon={pokemonInfo.pokemon}
                      />
                    </div>
                  )}{" "}
                </>
              )}
            </>
          )}
        </>
      )}
    </motion.div>
  );
}
