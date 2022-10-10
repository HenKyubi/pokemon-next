import React, { useContext, useEffect, useCallback } from "react";

// Interfaces
import { Pokemon } from "../interfaces/interfaces";

// API
import { fetchAllPokemons } from "../pages/api/index";

//Lotties
import Lottie from "react-lottie";
import noFoundPokemonLottie from "../public/lotties/pikachu.json";

//Components
import PokemonCard from "./pokemon-card";
import { AppContext } from "../context/app/app-context";
import { FilterContext } from "../context/filter/filter-context";

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

  //Context
  const { appState, getInitialGroupOfPokemons } = useContext(AppContext);
  const { filterState } = useContext(FilterContext);

  const { pokemonList } = appState;

  const fetchInitialPokemons = useCallback(() => {
    getInitialGroupOfPokemons();
  }, [getInitialGroupOfPokemons]);

  useEffect(() => {
    fetchInitialPokemons();
  }, []);

  return (
    <div className="row m-0 p-0">
      {filterState.hasActiveFilters ? (
        filterState.pokemonListFiltred.length > 0 ? (
          filterState.pokemonListFiltred.map((pokemon) => {
            return (
              <PokemonCard pokemonData={pokemon} key={pokemon.idPokemon} />
            );
          })
        ) : (
          <div className="d-flex flex-column align-items-center h-100 w-100 pt-5">
            <span>No found Pokemon</span>
            <div className="h-25 w-25">
              <Lottie options={DEFAULT_OPTIONS} />
            </div>
          </div>
        )
      ) : pokemonList.length > 0 ? (
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
