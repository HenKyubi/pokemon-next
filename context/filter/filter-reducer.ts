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

export const FilterReducer = (
  state: FilterState,
  action: FilterActions
): FilterState => {
  const filter = () => {
    if (state.hasFilterType && state.hasFilterColor && state.hasFilterGender) {
      const newPokemonListFiltred = state.pokemonListFiltredByType.filter(
        (pokemon) => {
          return (
            state.pokemonListFiltredByColor.find(
              (poke) => poke.idPokemon === pokemon.idPokemon
            ) &&
            state.pokemonListFiltredByGender.find(
              (pok) => pok.idPokemon === pokemon.idPokemon
            )
          );
        }
      );
      return { ...state, pokemonListFiltred: newPokemonListFiltred };
    } else {
      if (
        (state.hasFilterType && state.hasFilterColor) ||
        (state.hasFilterType && state.hasFilterGender) ||
        (state.hasFilterColor && state.hasFilterGender)
      ) {
        if (state.hasFilterType && state.hasFilterColor) {
          const newPokemonListFiltred = state.pokemonListFiltredByType.filter(
            (pokemon) => {
              return state.pokemonListFiltredByColor.find(
                (poke) => poke.idPokemon === pokemon.idPokemon
              );
            }
          );
          return { ...state, pokemonListFiltred: newPokemonListFiltred };
        } else if (state.hasFilterType && state.hasFilterGender) {
          const newPokemonListFiltred = state.pokemonListFiltredByType.filter(
            (pokemon) => {
              return state.pokemonListFiltredByGender.find(
                (poke) => poke.idPokemon === pokemon.idPokemon
              );
            }
          );
          return { ...state, pokemonListFiltred: newPokemonListFiltred };
        } else {
          const newPokemonListFiltred = state.pokemonListFiltredByColor.filter(
            (pokemon) => {
              return state.pokemonListFiltredByGender.find(
                (poke) => poke.idPokemon === pokemon.idPokemon
              );
            }
          );
          return { ...state, pokemonListFiltred: newPokemonListFiltred };
        }
      } else {
        if (
          state.hasFilterType ||
          state.hasFilterColor ||
          state.hasFilterGender
        ) {
          if (state.hasFilterType) {
            return {
              ...state,
              pokemonListFiltred: state.pokemonListFiltredByType,
            };
          } else if (state.hasFilterColor) {
            return {
              ...state,
              pokemonListFiltred: state.pokemonListFiltredByColor,
            };
          } else {
            return {
              ...state,
              pokemonListFiltred: state.pokemonListFiltredByGender,
            };
          }
        } else {
          return { ...state, pokemonListFiltred: [] };
        }
      }
    }
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
