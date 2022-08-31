import React, { useContext, useEffect, useState } from "react";
import Image from "../node_modules/next/image";
// import ModalContext from "../context/modal-context"
import { fetchPokemonDetails } from "../pages/api/index";
import { Pokemon, PokemonDetails } from "../interfaces/interfaces";
import { ModalContext } from "../context/modal/modal-context";

interface Props {
  pokemonData: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemonData }: Props) => {
  //Context
  const { modalState, setPokemonDataDetails, toggleModal } =
    useContext(ModalContext);
  const { modalOpen, pokemonDataDetails } = modalState;

  const PokemonDetails = async () => {
    try {
      if (pokemonData?.idPokemon) {
        const pokemonDetailsData: PokemonDetails = await fetchPokemonDetails(
          pokemonData?.idPokemon
        );
        pokemonDetailsData.imgPokemon = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedId}.png`;
        setPokemonDataDetails(pokemonDetailsData);
        toggleModal();
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const formatId = (id: number): String => {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return `${id}`;
    }
  };

  const formatedId = formatId(pokemonData.idPokemon);

  return (
    <div className="col-12 col-md-4 p-2">
      <button
        className="card shadow-sm pokemon-component h-100 w-100"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => {
          PokemonDetails();
        }}
      >
        <div className="d-flex justify-content-center w-100">
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatedId}.png`}
            className="card-img-top"
            alt={pokemonData?.namePokemon}
            // layout="fill"
            priority={true}
            width={200}
            height={200}
            // placeholder="blur"
          />
        </div>
        <div className="d-flex col-12 justify-content-evenly align-items-center pb-2">
          <span className="m-0 fs-5 fw-bold text-capitalize">
            {pokemonData?.namePokemon}
          </span>
          <span className="m-0 fs-5 fw-bold"> {pokemonData?.idPokemon}</span>
        </div>
      </button>
    </div>
  );
};

export default PokemonCard;
