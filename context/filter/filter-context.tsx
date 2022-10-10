import { createContext } from "react";
import { FilterState, Pokemon } from "../../interfaces/interfaces";

type FilterContextProps = {
  filterState: FilterState;
  filter: () => void;
  setPokemonListFiltredByType: (pokemonListFiltred: Array<Pokemon>) => void;
  setPokemonListFiltredByColor: (pokemonListFiltred: Array<Pokemon>) => void;
  setPokemonListFiltredByGender: (pokemonListFiltred: Array<Pokemon>) => void;
  setPokemonListFiltredBySearch: (pokemonListFiltred: Array<Pokemon>) => void;
  setHasFilterType: (isFiltred: boolean) => void;
  setHasFilterColor: (isFiltred: boolean) => void;
  setHasFilterGender: (isFiltred: boolean) => void;
  setHasFilterSearch: (isFiltred: boolean) => void;
  validateIfHasActiveFilters: () => void;
  resetFilterContext: () => void;
};

export const FilterContext = createContext<FilterContextProps>(
  {} as FilterContextProps
);
