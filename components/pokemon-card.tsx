import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
// import ModalContext from "../context/modal-context"
import { fetchPokemonDetails } from "../pages/api/index";
import { PokemonData } from "../interfaces/pokemon-details";
import { PokemonSpecies } from "../interfaces/pokemon-species";
// import {Pokemon} from "../pages/index"

interface Pokemon {
  idPokemon: number;
  namePokemon: String;
}

interface Props {
  pokemonData: Pokemon;
}

interface PokemonDetails {
  data: PokemonData;
  species: PokemonSpecies;
  img?: String;
}

const PokemonCard: React.FC<Props> = ({ pokemonData }) => {
  // const [formatedId, setFormatedId] = useState("")
  // const { setPokemonDetailData } = useContext(ModalContext)

  const PokemonDetails = async () => {
    try {
      if (pokemonData?.idPokemon) {
        let pokemonDetailsData: PokemonDetails = await fetchPokemonDetails(
          pokemonData?.idPokemon
        );
        pokemonDetailsData.img = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatedId}.png`;
        // setPokemonDetailData(pokemonDetailsData)
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  //  console.log(pokemonData?.idPokemon);

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

  useEffect(() => {
    console.log(formatedId);
  }, [formatedId]);

  // useEffect(() => {
  //   if (pokemonData?.idPokemon) formatId(JSON.stringify(pokemonData?.idPokemon))
  // }, [pokemonData])

  return (
    <div className="col-12 col-md-4 p-2">
      <button
        className="card shadow-sm pokemon-component h-100 w-100"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => {
          // PokemonDetails()
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
