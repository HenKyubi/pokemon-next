import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/app/app-context";
import { PokemonSpeciesDetail } from "../interfaces/response-by-gender";
import { Pokemon } from "../interfaces/interfaces";
import { getFilterGenderNames, getPokemonsByGender } from "../pages/api/index";
import {
  ResponseGenderNames,
  Result,
} from "../interfaces/response-gender-names";

const FilterGender = () => {
  // Context
  const { setPokemonList, setfiltred } = useContext(AppContext);

  //States
  const [resultGenderNames, setResultGenderNames] = useState<Array<Result>>([]);
  const [checkedState, setCheckedState] = useState<Array<boolean>>([]);
  const [isFiltred, setIsFiltred] = useState<boolean>(false);

  const fetchFilterNames = useCallback(async () => {
    try {
      const responseGenderNames: ResponseGenderNames =
        await getFilterGenderNames();
      setResultGenderNames(responseGenderNames.data.results);
      setCheckedState(new Array(resultGenderNames.length).fill(false));
    } catch (err) {
      console.log("err", err);
    }
  }, [resultGenderNames.length]);

  const getPokemonListByGender = async (
    id: string
  ): Promise<Array<PokemonSpeciesDetail>> => {
    const response = await getPokemonsByGender(id);
    return response.data.pokemon_species_details;
  };

  const handleOnChange = async (position: number) => {
    // Recibe el indice del checkbox que clickeamos
    // Se mapea el estado array de los chekeados, se crea un nuevo array de checkeados mientras sde busca la posicion clickeada y se niega
    const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        return !item;
      } else {
        return item;
      }
    });

    // se actualiza el estado de los checkeados con el array generado anteriormente
    setCheckedState(updatedCheckedState);

    // Se genera un array con los nombres de los tipos seleccionados
    const typesChecked: Array<string> = updatedCheckedState
      .map((value, index) => {
        if (value) {
          return resultGenderNames[index]?.name;
        }
      })
      .filter((type) => type !== undefined);

    //Se valida si hay checkeados o no
    if (typesChecked.length > 0) {
      setIsFiltred(true);
      setfiltred(true);
      const getPokemonListsByType: Array<Promise<Array<Pokemon>>> =
        typesChecked.map(async (value) => {
          return await getPokemonListByGender(value).then(
            (result): Array<Pokemon> =>
              //transformar datos recibidos en un pokemon
              result.map((pokemon): Pokemon => {
                const id = pokemon.pokemon_species.url.split("/")[6];
                return {
                  idPokemon: parseInt(id),
                  namePokemon: pokemon.pokemon_species.name,
                } as Pokemon;
              })
          );
        });
      Promise.all(getPokemonListsByType).then((lists) => {
        if (lists.length === 1) {
          setPokemonList(lists[0]);
        } else {
          const listOfAll = [...lists.flat()];

          const search = listOfAll.reduce((acc, pokemon) => {
            acc[pokemon.namePokemon] = ++acc[pokemon.namePokemon] || 0;
            return acc;
          }, {});

          const duplicates = listOfAll.filter((pokemon) => {
            if (search[pokemon.namePokemon] === lists.length - 1) {
              return search[pokemon.namePokemon];
            }
          });

          const set = Array.from(
            new Set(duplicates.map((item) => JSON.stringify(item)))
          ).map((pokemon) => JSON.parse(pokemon));
          setPokemonList(set);
        }
      });
    } else {
      setIsFiltred(false);
      setfiltred(false);
    }
  };

  useEffect(() => {
    fetchFilterNames();
  }, [fetchFilterNames]);

  return (
    <div className="type-filter row mx-3">
      <span className="p-0">Type:</span>

      {resultGenderNames.length > 0 &&
        resultGenderNames.map((resultGenderName, index) => (
          <div key={`pokemon-type-${index}`} className="form-check col-4">
            <input
              type="checkbox"
              id={`pokemon-type-${index}`}
              name={resultGenderName?.name}
              className="form-check-input"
              value={resultGenderName?.name}
              onChange={() => handleOnChange(index)}
            />
            <label
              className="form-check-label"
              htmlFor={`pokemon-type-${index}`}
            >
              {resultGenderName?.name}
            </label>
          </div>
        ))}
    </div>
  );
};

export default FilterGender;
