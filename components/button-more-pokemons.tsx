import React, { useContext } from "react";
import { AppContext } from "../context/app/app-context";
import { Pokemon } from "../interfaces/interfaces";
import { getNextPokemons } from "../pages/api/index";
const ButtonMorePokemons = () => {
  const { appState, setHasNextList, setPokemonList, setPositionOnArray } =
    useContext(AppContext);
  const { pokemonList, positionOnArray,hasNextList } = appState;

  const getNextList = (): void => {
    const next: Array<Pokemon> = getNextPokemons(positionOnArray);
    setPokemonList([...pokemonList, ...next]);
    setPositionOnArray();
    if (next.length !== 20) {
      setHasNextList();
    }
  };
  return (
    <>
      {hasNextList && (
        <button
          onClick={() => {
            getNextList();
          }}
        >
          More Pokemons
        </button>
      )}
    </>
  );
};

export default ButtonMorePokemons;