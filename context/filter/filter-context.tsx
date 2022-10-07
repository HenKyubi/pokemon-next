import { createContext } from "react";
import { FilterState, Pokemon } from "../../interfaces/interfaces";

type FilterContextProps = {
  filterState: FilterState;
  setPokemonListFiltred: (pokemonListFiltred: Array<Pokemon>) => void;
  setPokemonListFiltredByType: (pokemonListFiltred: Array<Pokemon>) => void;
  setPokemonListFiltredByColor: (pokemonListFiltred: Array<Pokemon>) => void;
  setPokemonListFiltredByGender: (pokemonListFiltred: Array<Pokemon>) => void;
  setHasFilterType: (isFiltred: boolean) => void;
  setHasFilterColor: (isFiltred: boolean) => void;
  setHasFilterGender: (isFiltred: boolean) => void;
  validateIfHasActiveFilters: () => void;
};

export const FilterContext = createContext<FilterContextProps>(
  {} as FilterContextProps
);
