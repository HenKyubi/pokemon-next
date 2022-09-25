import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/app/app-context";
import { PokemonResult } from "../interfaces/response-by-type";
import { ResponseTypesNames, Result } from "../interfaces/response-types-names";
import { Pokemon } from "../interfaces/interfaces";
import { getFilterTypeNames, getPokemonsByType } from "../pages/api/index";
// import FilterContext from "../context/filter-context"

const FilterType = () => {
  // Context
  const {
    appState,
    setPokemonList,
    setHasTypeFilter,
    validateIfHasActiveFilters,
  } = useContext(AppContext);

  const [resultTypesNames, setResultTypesNames] = useState<Array<Result>>([]);
  const [checkedState, setCheckedState] = useState<Array<boolean>>([]);

  const fetchFilterNames = useCallback(async () => {
    try {
      const responseTypesNames: ResponseTypesNames = await getFilterTypeNames();
      setResultTypesNames(responseTypesNames.data.results);
      setCheckedState(new Array(resultTypesNames.length).fill(false));
    } catch (err) {
      console.log("err", err);
    }
  }, [resultTypesNames.length]);

  const getPokemonListByType = async (
    id: string
  ): Promise<Array<PokemonResult>> => {
    const response = await getPokemonsByType(id);
    return response.data.pokemon;
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
          return resultTypesNames[index].name;
        }
      })
      .filter((type) => type !== undefined);

    //Se valida si hay checkeados o no
    if (typesChecked.length > 0) {
      setHasTypeFilter(true);
      const getPokemonListsByType: Array<Promise<Array<Pokemon>>> =
        typesChecked.map(async (value) => {
          return await getPokemonListByType(value).then(
            (result): Array<Pokemon> =>
              //transformar datos recibidos en un pokemon
              result.map((pokemon): Pokemon => {
                const id = pokemon.pokemon.url.split("/")[6];
                return {
                  idPokemon: parseInt(id),
                  namePokemon: pokemon.pokemon.name,
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
      setHasTypeFilter(false);
      validateIfHasActiveFilters();
    }
  };

  useEffect(() => {
    fetchFilterNames();
  }, [fetchFilterNames]);

  return (
    <div className="gender-filter row mx-3">
      <span className="p-0">Type:</span>
      {resultTypesNames.length > 0 &&
        resultTypesNames.map((resultTypeName, index) => (
          <div key={`custom-checkbox-${index}`} className="form-check col-6">
            <input
              type="checkbox"
              id={`custom-checkbox-${index}`}
              name={resultTypeName?.name}
              className="form-check-input"
              value={resultTypeName?.name}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
              // value={filtersSelected.includes(filter?.name)}
              // checked={filter[index]}
            />
            <label
              className="form-check-label"
              htmlFor={`custom-checkbox-${index}`}
            >
              {resultTypeName?.name}
            </label>
          </div>
        ))}
    </div>
  );
};

export default FilterType;
