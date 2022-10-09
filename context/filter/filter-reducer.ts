import { FilterState, Pokemon } from "../../interfaces/interfaces";
type FilterActions =
  | {
      type: "filter";
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
  | {
      type: "setPokemonListFiltredBySearch";
      payload: { pokemonListFiltred: Array<Pokemon> };
    }
  | { type: "setHasFilterType"; payload: { isFiltred: boolean } }
  | { type: "setHasFilterColor"; payload: { isFiltred: boolean } }
  | { type: "setHasFilterGender"; payload: { isFiltred: boolean } }
  | { type: "setHasFilterSearch"; payload: { isFiltred: boolean } }
  | { type: "validateIfHasActiveFilters" };

export const FilterReducer = (
  state: FilterState,
  action: FilterActions
): FilterState => {
  const filter = (): FilterState => {
    let newPokemonListFiltred: Array<Pokemon> = [];
    const pokemonsByType = state.pokemonListFiltredByType;
    const pokemonsByColor = state.pokemonListFiltredByColor;
    const pokemonsByGender = state.pokemonListFiltredByGender;
    const pokemonsBySearch = state.pokemonListFiltredBySearch;
    if (state.hasFilterType) {
      newPokemonListFiltred = pokemonsByType;
    }
    if (state.hasFilterColor) {
      if (newPokemonListFiltred.length > 0) {
        newPokemonListFiltred = newPokemonListFiltred.filter((pokemon) => {
          return pokemonsByColor.find(
            (pokemonByColor) => pokemon.idPokemon === pokemonByColor.idPokemon
          );
        });
      } else {
        newPokemonListFiltred = pokemonsByColor;
      }
    }
    if (state.hasFilterGender) {
      if (newPokemonListFiltred.length > 0) {
        newPokemonListFiltred = newPokemonListFiltred.filter((pokemon) => {
          return pokemonsByGender.find(
            (pokemonByGender) => pokemon.idPokemon === pokemonByGender.idPokemon
          );
        });
      } else {
        newPokemonListFiltred = pokemonsByGender;
      }
    }
    if (state.hasFilterSearch) {
      if (newPokemonListFiltred.length > 0) {
        newPokemonListFiltred = newPokemonListFiltred.filter((pokemon) => {
          return pokemonsBySearch.find(
            (pokemonBySearch) => pokemon.idPokemon === pokemonBySearch.idPokemon
          );
        });
      } else {
        newPokemonListFiltred = pokemonsBySearch;
      }
    }
    return { ...state, pokemonListFiltred: newPokemonListFiltred };
  };
  switch (action.type) {
    case "filter":
      return filter();
    case "setPokemonListFiltredByType":
      return {
        ...state,
        pokemonListFiltredByType: action.payload.pokemonListFiltred,
      };
    case "setPokemonListFiltredByColor":
      return {
        ...state,
        pokemonListFiltredByColor: action.payload.pokemonListFiltred,
      };
    case "setPokemonListFiltredByGender":
      return {
        ...state,
        pokemonListFiltredByGender: action.payload.pokemonListFiltred,
      };
    case "setPokemonListFiltredBySearch":
      return {
        ...state,
        pokemonListFiltredBySearch: action.payload.pokemonListFiltred,
      };
    case "setHasFilterType":
      return { ...state, hasFilterType: action.payload.isFiltred };
    case "setHasFilterColor":
      return { ...state, hasFilterColor: action.payload.isFiltred };
    case "setHasFilterGender":
      return { ...state, hasFilterGender: action.payload.isFiltred };
    case "setHasFilterSearch":
      return { ...state, hasFilterSearch: action.payload.isFiltred };
    case "validateIfHasActiveFilters":
      if (
        state.hasFilterType ||
        state.hasFilterColor ||
        state.hasFilterGender ||
        state.hasFilterSearch
      ) {
        return { ...state, hasActiveFilters: true };
      } else {
        return { ...state, hasActiveFilters: false };
      }
    default:
      state;
  }
};
