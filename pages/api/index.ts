import axios from "axios";
import { Pokemon, PokemonDetails } from "../../interfaces/interfaces";
import {
  ResponseAllPokemons,
  PokemonEntry,
} from "../../interfaces/response-all-pokemons";
import { ResponseDataPokemon } from "../../interfaces/response-data-pokemon";
import { ResponseSpeciesPokemon } from "../../interfaces/response-species.pokemon";
import { ResponseEvolutionChainPokemon } from "../../interfaces/response-evolution-chain-pokemon";
import { ResponseTypesNames } from "../../interfaces/response-types-names";
import { ResponseByType } from "../../interfaces/response-by-type";
import { ResponseColorNames } from "../../interfaces/response-color-names";
import { ResponseByColor } from "../../interfaces/response-by-color";
import { ResponseGenderNames } from "../../interfaces/response-gender-names";
import { ResponseByGender } from "../../interfaces/response-by-gender";

const URL = `https://pokeapi.co/api/v2/`;

/**
 * This function consults the API, formats the query in an object (pokemon list),
 * stores it in LocalStorage and returns the first position of the object
 * @returns first list of 20 pokemon
 */
export const getInitialPokemons = async (): Promise<Array<Pokemon>> => {
  return new Promise<Array<Pokemon>>(async (resolve, reject) => {
    try {
      let dataFormatted: string = localStorage.getItem("pokemonGroups");
      if (typeof dataFormatted !== "string") {
        const responseAllPokemons: ResponseAllPokemons = await axios.get(
          `${URL}pokedex/national/`
        );
        const pokemonListByList: Array<Pokemon> = orderDataOnList(
          responseAllPokemons.data.pokemon_entries
        );
        const pokemonListByGroups: Array<Array<Pokemon>> = orderDataOnGroups(
          responseAllPokemons.data.pokemon_entries
        );
        localStorage.setItem("pokemonList", JSON.stringify(pokemonListByList));
        localStorage.setItem(
          "pokemonGroups",
          JSON.stringify(pokemonListByGroups)
        );
        dataFormatted = JSON.stringify(pokemonListByGroups);
      }
      const pokemonGroups: Array<Array<Pokemon>> = JSON.parse(dataFormatted);
      resolve(pokemonGroups[0]);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * This function is to get the information for one pokemon
 * @param {String | Number} id The id Pokemon
 * @returns The Pokemon information about description and species
 */
export const fetchPokemonDetails = (id: number): Promise<PokemonDetails> => {
  return new Promise<PokemonDetails>(async (resolve, reject) => {
    try {
      const responseDataPokemon: ResponseDataPokemon = await axios.get(
        `${URL}pokemon/${id}`
      );
      const responseSpeciesPokemon: ResponseSpeciesPokemon = await axios.get(
        `${URL}pokemon-species/${id}`
      );
      const responseEvolutionChainPokemon: ResponseEvolutionChainPokemon =
        await axios.get(`${URL}evolution-chain/${id}`);
      resolve({
        namePokemon: responseDataPokemon?.data?.name,
        idPokemon: responseDataPokemon?.data?.id,
        description:
          responseSpeciesPokemon?.data?.flavor_text_entries[0]?.flavor_text,
        height: responseDataPokemon?.data?.height,
        weight: responseDataPokemon?.data?.weight,
        category: responseDataPokemon?.data?.types[0]?.type?.name,
        gender:
          responseSpeciesPokemon?.data?.gender_rate === -1
            ? "genderless"
            : "male - female",
        habitat: responseSpeciesPokemon?.data?.habitat?.name,
        color: responseSpeciesPokemon?.data?.color?.name,
        types: responseDataPokemon?.data?.types?.map((type) => type.type.name),
        evolution: responseSpeciesPokemon?.data?.evolution_chain?.url,
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * gets the information in LocalStorage, formats it and returns the following list of pokemon
 * @param {Array} positionInList Actual position of the list
 * @returns next list of pokemon
 */
export const getNextPokemons = (positionInList: number): Array<Pokemon> => {
  const fullList: Array<Array<Pokemon>> = JSON.parse(
    localStorage.getItem("pokemonGroups")
  );
  return fullList[positionInList];
};

/**
 * get the object in on the type endpoint
 * @returns list of pokemons for type
 */
export const getNamesFilterType = (): Promise<ResponseTypesNames> => {
  return new Promise<ResponseTypesNames>(async (resolve, reject) => {
    try {
      const responseTypesNames: ResponseTypesNames = await axios.get(
        `${URL}type/`
      );
      resolve(responseTypesNames);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPokemonsByType = (id: string): Promise<ResponseByType> => {
  return new Promise<ResponseByType>(async (resolve, reject) => {
    try {
      const responseByType: ResponseByType = await axios.get(
        `${URL}type/${id}`
      );
      resolve(responseByType);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * get the object in on the color endpoint
 * @returns list of pokemons for color
 */
export const getNamesFilterColor = (): Promise<ResponseColorNames> => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseColorNames: ResponseColorNames = await axios.get(
        `${URL}pokemon-color/`
      );
      resolve(responseColorNames);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPokemonsByColor = (id: string): Promise<ResponseByColor> => {
  return new Promise<ResponseByColor>(async (resolve, reject) => {
    try {
      const responseByColor: ResponseByColor = await axios.get(
        `${URL}pokemon-color/${id}`
      );
      resolve(responseByColor);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * get the object in on the gender endpoint
 * @returns list of pokemons for gender
 */
export const getNamesFilterGender = (): Promise<ResponseGenderNames> => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseGenderNames = await axios.get(`${URL}gender/`);
      resolve(responseGenderNames);
    } catch (error) {
      reject(error);
    }
  });
};

export const getPokemonsByGender = (id: string): Promise<ResponseByGender> => {
  return new Promise(async (resolve, reject) => {
    try {
      const responseByGender = await axios.get(`${URL}gender/${id}`);
      resolve(responseByGender);
    } catch (err) {
      reject(err);
    }
  });
};

export const getPokemonsBySearch = (search: string): Array<Pokemon> => {
  if (search.length > 0) {
    const listOfAllPokemons = getListOfAllPokemons();
    const id: number = +search;
    if (id > 0) {
      const pokemonListFiltred = listOfAllPokemons.filter((pokemon) =>
        pokemon.idPokemon.toString().includes(search)
      );
      return pokemonListFiltred;
    } else {
      const pokemonListFiltred = listOfAllPokemons.filter((pokemon) =>
        pokemon.namePokemon.includes(search)
      );
      return pokemonListFiltred;
    }
  } else {
    return [];
  }
};

/**
 * reorganize the Array of Objects into a unicap Array
 * @param {Array<PokemonEntry>} arrayOfObjects Array of PokemonEntry
 * @returns Array of Array of 20 Pokemons
 */
const orderDataOnGroups = (
  arrayOfObjects: Array<PokemonEntry>
): Array<Array<Pokemon>> => {
  //create empy list of pokemons
  let pokemonList: Array<Array<Pokemon>> = [];

  //order pokemonList for to save in localStorage
  const max: number = Math.round(arrayOfObjects.length / 20);
  let count: number = 0;
  let temporalList: Array<Pokemon> = [];
  const endList: number = arrayOfObjects.length;

  for (let index = 0; index < endList; index++) {
    temporalList.push({
      idPokemon: arrayOfObjects[index].entry_number,
      namePokemon: arrayOfObjects[index].pokemon_species?.name,
    });
    if ((index + 1) % 20 === 0) {
      pokemonList.push(temporalList);
      temporalList = [];
      count++;
    } else {
      if (max - count === 1) {
        if (index + 1 === endList) {
          pokemonList.push(temporalList);
          temporalList = [];
        }
      }
    }
  }
  return pokemonList;
};

const orderDataOnList = (
  pokemonEntryList: Array<PokemonEntry>
): Array<Pokemon> => {
  return pokemonEntryList.map((pokemon) => {
    return {
      idPokemon: pokemon.entry_number,
      namePokemon: pokemon.pokemon_species?.name,
    };
  });
};

const getListOfAllPokemons = (): Array<Pokemon> => {
  return JSON.parse(localStorage.getItem("pokemonList"));
};
