import { useReducer } from "react";
import { FilterState, Pokemon } from "../../interfaces/interfaces";
import { FilterContext } from "./filter-context";
import { FilterReducer } from "./filter-reducer";

const INITIAL_STATE: FilterState = {
  pokemonListFiltred: [],
  pokemonListFiltredByType: [],
  pokemonListFiltredByColor: [],
  pokemonListFiltredByGender: [],
  pokemonListFiltredBySearch: [],
  hasFilterType: false,
  hasFilterColor: false,
  hasFilterGender: false,
  hasFilterSearch: false,
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
  const setPokemonListFiltredBySearch = (
    pokemonListFiltred: Array<Pokemon>
  ) => {
    dispatch({
      type: "setPokemonListFiltredBySearch",
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
  const setHasFilterSearch = (isFiltred: boolean) => {
    dispatch({ type: "setHasFilterSearch", payload: { isFiltred } });
  };
  const validateIfHasActiveFilters = () => {
    dispatch({ type: "validateIfHasActiveFilters" });
  };
  return (
    <FilterContext.Provider
      value={{
        filterState: filterState,
        filter: filter,
        setPokemonListFiltredByType: setPokemonListFiltredByType,
        setPokemonListFiltredByColor: setPokemonListFiltredByColor,
        setPokemonListFiltredByGender: setPokemonListFiltredByGender,
        setPokemonListFiltredBySearch: setPokemonListFiltredBySearch,
        setHasFilterType: setHasFilterType,
        setHasFilterColor: setHasFilterColor,
        setHasFilterGender: setHasFilterGender,
        setHasFilterSearch: setHasFilterSearch,
        validateIfHasActiveFilters: validateIfHasActiveFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
