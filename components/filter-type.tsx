import React, { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/app/app-context";
import { ResponseByType, Pokemon } from "../interfaces/response-by-type";
import { ResponseTypesNames, Result } from "../interfaces/response-types-names";
import { getFilterTypeNames, getPokemonsByType } from "../pages/api/index";
// import FilterContext from "../context/filter-context"

const FilterType = () => {
  // Context
  const { setPokemonList } = useContext(AppContext);

  const [resultTypesNames, setResultTypesNames] = useState<Array<Result>>([]);
  const [checkedState, setCheckedState] = useState<Array<boolean>>([]);
  const [pokemonListFiltred, setPokemonListFiltred] = useState<Array<Pokemon>>(
    []
  );

  // const [filtersSelected, setFiltersSelected] = useState([])
  // // const { setFilterType } = useContext(FilterContext)

  const fetchFilterNames = useCallback(async () => {
    try {
      const responseTypesNames: ResponseTypesNames = await getFilterTypeNames();
      setResultTypesNames(responseTypesNames.data.results);
      setCheckedState(new Array(resultTypesNames.length).fill(false));
    } catch (err) {
      console.log("err", err);
    }
  }, [resultTypesNames.length]);

  // const getPokemonNames = async (types = []) => {
  //   let newArrayPokemonNames = []
  //   for (let i = 0; i < types.length; i++) {
  //     const pokemons = await getPokemonsInType(types[i])
  //     const pokemonNames = []
  //     for (let i = 0; i < pokemons.pokemon.length; i++) {
  //       pokemonNames.push(pokemons.pokemon[i].pokemon.name)
  //     }
  //     newArrayPokemonNames.push(...pokemonNames)
  //   }
  //   newArrayPokemonNames = removeRepeat(newArrayPokemonNames)
  //   return newArrayPokemonNames
  // }

  // const onChange = async id => {
  //   let selected = filtersSelected
  //   let find = selected.indexOf(id)
  //   if (find > -1) {
  //     selected.splice(find, 1)
  //   } else {
  //     selected.push(id)
  //   }
  //   setFiltersSelected(selected)
  //   const selectedNames = await getPokemonNames(selected)
  //   setFilterType(selectedNames)
  // }

  const onChange = async (id) => {
    const lel = await getPokemonsByType(id);
    console.log(lel);
    // setPokemonList();
  };

  const [total, setTotal] = useState(0);

  const getPokemonListByType = async (id: string): Promise<Array<Pokemon>> => {
    const response = await getPokemonsByType(id);
    return response.data.pokemon;
  };

  const handleOnChange = async (position: number) => {
    // Recibe el indice del checkbox que clickeamos
    console.log("posicion del check clickada");
    console.log(position);

    // Se mapea el estado array de los chekeados, se crea un nuevo array de checkeados mientras sde busca la posicion clickeada y se niega
    const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        console.log(item);
        return !item;
      } else {
        return item;
      }
      // index === position ? !item : item
    });
    console.log("nuevo array");
    console.log(updatedCheckedState);

    // se actualiza el estado de los checkeados con el array generado anteriormente
    setCheckedState(updatedCheckedState);

    // Se genera un array con los nombres de los tipos seleccionados
    const typesChecked: Array<string> = updatedCheckedState
      .map((value, index) => {
        if (value) {
          console.log(resultTypesNames[index].name);
          return resultTypesNames[index].name;
        }
      })
      .filter((type) => type !== undefined);

    //Se valida si hay checkeados o no
    if (typesChecked.length > 0) {
      const pokemonListResults = () =>
        typesChecked.map(async (value) => {
          return await getPokemonListByType(value).then((result) =>
            result.map((pokemon) => {
              const id = pokemon.pokemon.url.split("/")[6];
              return {
                idPokemon: id,
                namePokemon: pokemon.pokemon.name,
              };
            })
          );
        });

      console.log(pokemonListResults().);

      // pokemonListResults.map(list=>console.log(list))
    } else {
      // setPokemonList(await ge)
      setPokemonListFiltred([]);
    }

    // console.log(oh.map);
    // console.log(checkedState)
    // checkedState.map((pos, ind) => {
    //   console.log(pos)
    //   if (pos) {
    //     const lel = fetch(resultTypesNames[ind].url).then((res)=>console.log(res))
    //     // console.log(lel)
    //   }
    // });
    // console.log(updatedCheckedState);

    // const totalPrice = updatedCheckedState.reduce(
    //   (sum, currentState, index) => {
    //     if (currentState === true) {
    //       return sum + checkedState[index].price;
    //     }
    //     return sum;
    //   },
    //   0
    // );

    // setTotal(totalPrice);
  };

  useEffect(() => {
    fetchFilterNames();
  }, [fetchFilterNames]);
  return (
    <div className="gender-filter row mx-3">
      {pokemonListFiltred.map((lel) => lel.pokemon.name)}
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
