import { FilterState, Pokemon } from "../../interfaces/interfaces";
type FilterActions =
  | {
      type: "filter";
    }
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
// const filter = () => {};
export const FilterReducer = (
  state: FilterState,
  action: FilterActions
): FilterState => {
  const filter = () => {
    if (state.hasFilterType) {
      const newPokemonListFiltred = state.pokemonListFiltredByType.filter(
        (pokemon) => {
          return state.pokemonListFiltred.find(
            (poke) => poke.idPokemon === pokemon.idPokemon
          );
        }
      );
      return { ...state, pokemonListFiltred: newPokemonListFiltred };
    }
    if (state.hasFilterColor) {
      const newPokemonListFiltred = state.pokemonListFiltredByColor.filter(
        (pokemon) => {
          return state.pokemonListFiltred.find(
            (poke) => poke.idPokemon === pokemon.idPokemon
          );
        }
      );
      return { ...state, pokemonListFiltred: newPokemonListFiltred };
    }
    if (state.hasFilterGender) {
      const newPokemonListFiltred = state.pokemonListFiltredByGender.filter(
        (pokemon) => {
          return state.pokemonListFiltred.find(
            (poke) => poke.idPokemon === pokemon.idPokemon
          );
        }
      );
      return { ...state, pokemonListFiltred: newPokemonListFiltred };
    }
    return state;
  };
  switch (action.type) {
    case "filter":
      return filter();
    // case "setPokemonListFiltred":
    //   if (
    //     (state.hasFilterType && state.hasFilterColor) ||
    //     (state.hasFilterType && state.hasFilterGender) ||
    //     (state.hasFilterColor && state.hasFilterGender)
    //   ) {
    //     const newPokemonListFiltred = action.payload.pokemonListFiltred.filter(
    //       (pokemon) => {
    //         return state.pokemonListFiltred.find(
    //           (poke) => poke.idPokemon === pokemon.idPokemon
    //         );
    //       }
    //     );
    //     return { ...state, pokemonListFiltred: newPokemonListFiltred };
    //   } else {
    //     return {
    //       ...state,
    //       pokemonListFiltred: action.payload.pokemonListFiltred,
    //     };
    //   }
    case "setPokemonListFiltredByType":
      if (state.hasFilterColor || state.hasFilterGender) {
        return filter();
      } else {
        return {
          ...state,
          pokemonListFiltredByType: action.payload.pokemonListFiltred,
          pokemonListFiltred: action.payload.pokemonListFiltred,
        };
      }
    // return {
    //   ...state,
    //   pokemonListFiltredByType: action.payload.pokemonListFiltred,
    // };
    case "setPokemonListFiltredByColor":
      if (state.hasFilterType || state.hasFilterGender) {
        return filter();
      } else {
        return {
          ...state,
          pokemonListFiltred: action.payload.pokemonListFiltred,
          pokemonListFiltredByColor: action.payload.pokemonListFiltred,
        };
      }
    case "setPokemonListFiltredByGender":
      if (state.hasFilterType || state.hasFilterColor) {
        return filter();
      } else {
        return {
          ...state,
          pokemonListFiltred: action.payload.pokemonListFiltred,
          pokemonListFiltredByGender: action.payload.pokemonListFiltred,
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
