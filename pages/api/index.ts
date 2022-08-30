import axios from "axios";
import { PokemonData } from "../../interfaces/pokemon-details";
import { PokemonSpecies } from "../../interfaces/pokemon-species";
import { Pokemon, PokemonDetails } from "../../interfaces/interfaces";
import {
  ResponseAllPokemons,
  PokemonEntry,
} from "../../interfaces/response-all-pokemons";
import { ResponseDataPokemon } from "../../interfaces/response-data-pokemon";
import { ResponseSpeciesPokemon } from "../../interfaces/response-species.pokemon";
import { ResponseEvolutionChainPokemon } from "../../interfaces/response-evolution-chain-pokemon";

const URL = `https://pokeapi.co/api/v2/`;

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
 * This function consults the API, formats the query in an object (pokemon list),
 * stores it in LocalStorage and returns the first position of the object
 * @returns first list of 20 pokemon
 */
export const getInitialPokemons = async (): Promise<Array<Pokemon>> => {
  return new Promise<Array<Pokemon>>(async (resolve, reject) => {
    try {
      let dataFormatted: string = localStorage.getItem("allPokemons");
      if (typeof dataFormatted !== "string") {
        const responseAllPokemons: ResponseAllPokemons = await axios.get(
          `${URL}pokedex/national/`
        );
        const pokemonList: Array<Array<Pokemon>> = reOrderFormatted(
          responseAllPokemons.data.pokemon_entries
        );
        localStorage.setItem("allPokemons", JSON.stringify(pokemonList));
        dataFormatted = JSON.stringify(pokemonList);
      }
      const pokemonList: Array<Array<Pokemon>> = JSON.parse(dataFormatted);
      resolve(pokemonList[0]);
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
    localStorage.getItem("allPokemons")
  );
  return fullList[positionInList];
};

/**
 * get the object in on the type endpoint
 * @returns list of pokemons for type
 */
export const getFilterNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${URL}type/`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * get the object in on the color endpoint
 * @returns list of pokemons for color
 */
export const getColorNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${URL}pokemon-color/`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * get the object in on the gender endpoint
 * @returns list of pokemons for gender
 */
export const getGenderNames = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${URL}gender/`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * get two lists data and filter, data is filtered with the filter information
 * @param {Arrray} data
 * @param {Array} filter
 * @returns new list of pokemons filtered
 */
export const getFilterPokemons = (data = [], filter = []) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arr = [];
      for (let i = 0; i < filter.length; i++) {
        const newFilter = data.filter((pokemon) =>
          pokemon.data.types.filter((type) => type.type.name === filter[i])
        );
        arr.push(newFilter);
      }
      resolve(arr);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * reorganize the Array of Objects into a unicap Array
 * @param {Array<PokemonEntry>} arrayOfObjects Array of PokemonEntry
 * @returns Array of Array of 20 Pokemons
 */
export const reOrderFormatted = (
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

export const getPokemonsInType = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${URL}type/${id}`);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const getPokemonsInColors = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${URL}pokemon-color/${id}`);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const getPokemonsInGender = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${URL}gender/${id}`);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeRepeat = (array = []) => {
  return array.filter((item, index) => array.indexOf(item) === index);
};

export const doFilter = (filterType, filterColors, filterGender) => {
  return new Promise(async (resolve, reject) => {
    try {
      let pokemonList = [];
      if (filterType.length > 0) pokemonList.push(...filterType);
      if (filterColors.length > 0) pokemonList.push(...filterColors);
      if (filterGender.length > 0) pokemonList.push(...filterGender);
      pokemonList = removeRepeat(pokemonList);
      const dataFormatted = JSON.parse(localStorage.getItem("allPokemons"));
      let listOrder = [];
      for (let index = 0; index < dataFormatted.length; index++) {
        const element = dataFormatted[index];
        for (let index = 0; index < element.length; index++) {
          const pokemonData = element[index];
          listOrder.push(pokemonData);
        }
      }
      let searchList = [];
      for (let i = 0; i < pokemonList.length; i++) {
        const pokemonsFiltred = listOrder.filter((item) =>
          item.namePokemon.includes(pokemonList[i])
        );
        if (pokemonsFiltred.length > 0) searchList.push(...pokemonsFiltred);
      }
      searchList = removeRepeat(searchList);
      pokemonList = await reOrderFormatted(searchList);
      pokemonList =
        pokemonList.length < searchList.length ? searchList : pokemonList;
      resolve(pokemonList);
    } catch (err) {
      reject(err);
    }
  });
};
