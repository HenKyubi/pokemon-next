import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/app/app-context";
import { FilterContext } from "../context/filter/filter-context";
import { Pokemon } from "../interfaces/interfaces";
import { PokemonSpecy } from "../interfaces/response-by-color";
import { Result } from "../interfaces/response-color-names";
import { getColorNames, getPokemonsByColor } from "../pages/api/index";
// import classNames from "classnames";

const FilterColors = () => {
  // Context

  const {
    filterState,
    filter,
    setHasFilterColor,
    setPokemonListFiltredByColor,
    validateIfHasActiveFilters,
  } = useContext(FilterContext);

  const [resultColorNames, setResultColorNames] = useState<Array<Result>>([]);
  const [checkedState, setCheckedState] = useState<Array<boolean>>([]);

  const fetchFilterNames = useCallback(async () => {
    try {
      const responseColorNames = await getColorNames();
      setResultColorNames(responseColorNames.data.results);
      setCheckedState(new Array(resultColorNames.length).fill(false));
    } catch (err) {
      console.log("err", err);
    }
  }, [resultColorNames.length]);

  const getPokemonListByColor = async (
    id: string
  ): Promise<Array<PokemonSpecy>> => {
    const response = await getPokemonsByColor(id);
    return response.data.pokemon_species;
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
          return resultColorNames[index].name;
        }
      })
      .filter((type) => type !== undefined);

    //Se valida si hay checkeados o no
    if (typesChecked.length > 0) {
      const getPokemonListsByColor: Array<Promise<Array<Pokemon>>> =
        typesChecked.map(async (value) => {
          return await getPokemonListByColor(value).then((result) =>
            // transformar datos recibidos en un pokemon
            result.map((pokemon): Pokemon => {
              const id = pokemon.url.split("/")[6];
              return {
                idPokemon: parseInt(id),
                namePokemon: pokemon.name,
              } as Pokemon;
            })
          );
        });
      Promise.all(getPokemonListsByColor)
        .then((lists) => {
          if (lists.length === 1) {
            return lists[0];
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
            return set;
          }
        })
        .then((pokemonList) => {
          setHasFilterColor(true);
          validateIfHasActiveFilters();
          setPokemonListFiltredByColor(pokemonList);
        });
    } else {
      setHasFilterColor(false);
      validateIfHasActiveFilters();
      if (filterState.hasActiveFilters) {
        filter();
      } else {
        setPokemonListFiltredByColor([]);
      }
    }
  };

  useEffect(() => {
    fetchFilterNames();
  }, [fetchFilterNames]);

  return (
    <div className="color-filter row mx-3">
      <span className="p-0">Color:</span>
      {/* <div
        className="btn-group colors-container"
        role="group"
        aria-label="Basic checkbox toggle button group"
      > */}
      {resultColorNames.length > 0 &&
        resultColorNames.map((resultColorName, index) => (
          <div key={`color-${index}`} className="form-check col-6">
            <input
              type="checkbox"
              id={`color-${index}`}
              name={resultColorName?.name}
              className="form-check-input"
              value={resultColorName?.name}
              checked={checkedState[index]}
              // autoComplete="off"
              // aria-label={`color-${resultColorName?.name}`}
              onChange={() => handleOnChange(index)}
            />
            <label
              // className={classNames(`btn ${filter?.name}`, {
              //   "btn-selected-in-color": colorSelected.includes(filter?.name),
              // })}
              // aria-labelledby={`color-${resultColorName?.name}`}
              className="form-check-label"
              htmlFor={`color-${index}`}
            >
              {resultColorName?.name}
            </label>
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default FilterColors;
