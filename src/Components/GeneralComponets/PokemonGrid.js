import React from "react";
import "./PokemonGrid.css";
import PokemonCard from "./PokemonCard";

export default function PokemonGrid(props) {
  const pokemons = props.allPokemons.map((pokemon) => (
    <PokemonCard
      img={pokemon.sprites.other.home.front_default}
      key={Math.random() * 10000}
      name={pokemon.name}
      pokemon={pokemon}
    />
  ));
  return <div className="container poke-grid">{pokemons}</div>;
}
