import React, { useContext } from "react";

// Interfaces
import { Pokemon } from "../interfaces/interfaces";

//Lotties
import Lottie from "react-lottie";
import noFoundPokemonLottie from "../public/lotties/pikachu.json";

//Components
import PokemonCard from "./pokemon-card";
import { AppContext } from "../context/app/app-context";

// interface Props {
//   pokemonList: Array<Pokemon>;
// }

const PokemonList = (): JSX.Element => {
  // Optios to lottie
  const DEFAULT_OPTIONS = {
    loop: true,
    autoplay: true,
    animationData: noFoundPokemonLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {appState} = useContext(AppContext)
  const {pokemonList} = appState
  return (
    <div className="w-100 h-100">
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => {
          return <PokemonCard pokemonData={pokemon} key={pokemon.idPokemon} />;
        })
      ) : (
        <div className="d-flex flex-column align-items-center h-100 w-100 pt-5">
          <span>No found Pokemon</span>
          <div className="h-25 w-25">
            <Lottie options={DEFAULT_OPTIONS} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
