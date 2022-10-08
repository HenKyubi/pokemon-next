import { useReducer } from "react";
import { FilterState, Pokemon } from "../../interfaces/interfaces";
import { FilterContext } from "./filter-context";
import { FilterReducer } from "./filter-reducer";

const INITIAL_STATE: FilterState = {
  pokemonListFiltred: [],
  pokemonListFiltredByType: [],
  pokemonListFiltredByColor: [],
  pokemonListFiltredByGender: [],
  hasFilterType: false,
  hasFilterColor: false,
  hasFilterGender: false,
  hasActiveFilters: false,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const FilterProvider = ({ children }: Props) => {
  const [filterState, dispatch] = useReducer(FilterReducer, INITIAL_STATE);
  const filter = () => {
    dispatch({
      type: "filter",
    });
  };
  const setPokemonListFiltred = (pokemonListFiltred: Array<Pokemon>) => {
    dispatch({
      type: "setPokemonListFiltred",
      payload: { pokemonListFiltred },
    });
  };
  const setPokemonListFiltredByType = (pokemonListFiltred: Array<Pokemon>) => {
    dispatch({
      type: "setPokemonListFiltredByType",
      payload: { pokemonListFiltred },
    });
  };
  const setPokemonListFiltredByColor = (pokemonListFiltred: Array<Pokemon>) => {
    dispatch({
      type: "setPokemonListFiltredByColor",
      payload: { pokemonListFiltred },
    });
  };
  const setPokemonListFiltredByGender = (
    pokemonListFiltred: Array<Pokemon>
  ) => {
    dispatch({
      type: "setPokemonListFiltredByGender",
      payload: { pokemonListFiltred },
    });
  };
  const setHasFilterType = (isFiltred: boolean) => {
    dispatch({ type: "setHasFilterType", payload: { isFiltred } });
  };
  const setHasFilterColor = (isFiltred: boolean) => {
    dispatch({ type: "setHasFilterColor", payload: { isFiltred } });
  };
  const setHasFilterGender = (isFiltred: boolean) => {
    dispatch({ type: "setHasFilterGender", payload: { isFiltred } });
  };
  const validateIfHasActiveFilters = () => {
    dispatch({ type: "validateIfHasActiveFilters" });
  };
  return (
    <FilterContext.Provider
      value={{
        filterState: filterState,
        filter: filter,
        // setPokemonListFiltred: setPokemonListFiltred,
        setPokemonListFiltredByType: setPokemonListFiltredByType,
        setPokemonListFiltredByColor: setPokemonListFiltredByColor,
        setPokemonListFiltredByGender: setPokemonListFiltredByGender,
        setHasFilterType: setHasFilterType,
        setHasFilterColor: setHasFilterColor,
        setHasFilterGender: setHasFilterGender,
        validateIfHasActiveFilters: validateIfHasActiveFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
