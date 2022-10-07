import { FilterState, Pokemon } from "../../interfaces/interfaces";
type FilterActions =
  | {
      type: "setPokemonListFiltred";
      payload: { pokemonListFiltred: Array<Pokemon> };
    }
  | {
      type: "setPokemonListFiltredByType";
      payload: { pokemonListFiltred: Array<Pokemon> };
    }
  | {
      type: "setPokemonListFiltredByColor";
      payload: { pokemonListFiltred: Array<Pokemon> };
    }
  | {
      type: "setPokemonListFiltredByGender";
      payload: { pokemonListFiltred: Array<Pokemon> };
    }
  | { type: "setHasFilterType"; payload: { isFiltred: boolean } }
  | { type: "setHasFilterColor"; payload: { isFiltred: boolean } }
  | { type: "setHasFilterGender"; payload: { isFiltred: boolean } }
  | { type: "validateIfHasActiveFilters" };

// | { type: "setModalData"; payload: { pokemonDetails: PokemonDetails } }

export const FilterReducer = (
  state: FilterState,
  action: FilterActions
): FilterState => {
  switch (action.type) {
    case "setPokemonListFiltred":
      if (state.hasActiveFilters) {
        state.pokemonListFiltredByType;
        state.pokemonListFiltredByColor;
        state.pokemonListFiltredByGender;
        const newPokemonList = [];
        return { ...state, pokemonListFiltred: newPokemonList };
      } else {
        return {
          ...state,
          pokemonListFiltred: action.payload.pokemonListFiltred,
        };
      }
    case "setHasFilterType":
      return { ...state, hasFilterType: action.payload.isFiltred };
    case "setHasFilterColor":
      return { ...state, hasFilterColor: action.payload.isFiltred };
    case "setHasFilterGender":
      return { ...state, hasFilterGender: action.payload.isFiltred };
    case "validateIfHasActiveFilters":
      if (
        state.hasFilterType ||
        state.hasFilterColor ||
        state.hasFilterGender
      ) {
        return { ...state, hasActiveFilters: true };
      } else {
        return { ...state, hasActiveFilters: false };
      }
    default:
      state;
  }
};
