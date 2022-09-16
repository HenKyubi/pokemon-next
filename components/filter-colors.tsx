import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/app/app-context";
import { Pokemon } from "../interfaces/interfaces";
import { Result } from "../interfaces/response-color-names";
import { getColorNames } from "../pages/api/index";
// import classNames from "classnames";
// import FilterContext from "../context/filter-context";

const FilterColors = () => {
  // Context
  const { setPokemonList } = useContext(AppContext);

  const [resultColorNames, setResultColorNames] = useState<Array<Result>>([]);
  const [checkedState, setCheckedState] = useState<Array<boolean>>([]);
  const [isFiltred, setIsFiltred] = useState<boolean>(false);

  const fetchFilterNames = useCallback(async () => {
    try {
      const responseColorNames = await getColorNames();
      console.log(responseColorNames.data.results);
      setResultColorNames(responseColorNames.data.results);
      setCheckedState(new Array(resultColorNames.length).fill(false));
    } catch (err) {
      console.log("err", err);
    }
  }, [resultColorNames.length]);

  // const getPokemonNames = async (types = []) => {
  //   let newArrayPokemonNames = []
  //   for (let i = 0; i < types.length; i++) {
  //     const pokemons = await getPokemonsInColors(types[i])
  //     const pokemonNames = []
  //     for (let i = 0; i < pokemons.pokemon_species.length; i++) {
  //       pokemonNames.push(pokemons.pokemon_species[i].name)
  //     }
  //     newArrayPokemonNames.push(...pokemonNames)
  //   }
  //   newArrayPokemonNames = newArrayPokemonNames.filter(
  //     (item, index) => newArrayPokemonNames.indexOf(item) === index
  //   )
  //   return newArrayPokemonNames
  // }

  // const onChange = async id => {
  //   let selected = colorSelected
  //   let find = selected.indexOf(id)
  //   if (find > -1) {
  //     selected.splice(find, 1)
  //   } else {
  //     selected.push(id)
  //   }
  //   setColorSelected(selected)
  //   const selectedNames = await getPokemonNames(selected)
  //   setFilterColors(selectedNames)
  // }

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
            <div key={`color-${index}`} className="form-check col-4">
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
