import React from "react";
import "./PokemonCard.css";
import { pokemonInfoActions } from "../../Store/PokemonInfoSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
export default function PokemonCard(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const ShowInfo = (e) => {
    dispatch(pokemonInfoActions.ShowPokemonInfo(props.pokemon));
    history.push(`/info/${props.pokemon.name}/about`);
  };
  return (
    <div
      className="card pokemon-card"
      
    >
      <img className="pokemon-img" src={props.img}></img>
      <h4>{props.name}</h4>
      <button className="pokemon-card-button" onClick={ShowInfo}>
        INFO
      </button>
    </div>
  );
}
