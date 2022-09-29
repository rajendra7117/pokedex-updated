import React, { useEffect, useState } from "react";
import PokemonGrid from "../GeneralComponets/PokemonGrid";
import { useDispatch } from "react-redux";
import "./Random.css";
import { fetchPokemons } from "../../Store/pokemons/random";
import { useSelector } from "react-redux";
import ErrorCard from "../GeneralComponets/ErrorCard";
const Random = () => {
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const [allPokemons, setAllPokemons] = useState([]);

  const state = useSelector((state) => state.random);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.pokemons) {
      setAllPokemons([]);
      state.pokemons.forEach((element) => {
        fetch(element.url)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setAllPokemons((prev) => [...prev, data]);
          });
      });
    }
  }, [state.pokemons]);

  useEffect(() => {
    dispatch(fetchPokemons(currentUrl));
  }, [currentUrl]);
  const nextPage = (e) => {
    setCurrentUrl(state.nextUrl);
  };
  const previousPage = (e) => {
    setCurrentUrl(state.previousUrl);
  };

  return (
    <div className="container">
      <div>
        {state.error !== "" ? (
          <>
          <ErrorCard message={state.error}/>
          </>
        ) : (
          <>
            {state.loading ? (
              <h3>loading..</h3>
            ) : (
              <>
                <PokemonGrid allPokemons={allPokemons} />
                <div className="container buttons-div">
                  {state.previousUrl !== null && (
                    <button onClick={previousPage}>Prev</button>
                  )}
                  <button onClick={nextPage}>Next</button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Random);
