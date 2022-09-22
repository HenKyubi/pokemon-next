import { AppState, Pokemon, PokemonDetails } from "../../interfaces/interfaces";
type AppActions =
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "setPositionOnArray" }
  | { type: "setHasNextList" }
  | { type: "setHasTypeFilter"; payload: { isFiltred: boolean } }
  | { type: "setHasColorFilter"; payload: { isFiltred: boolean } }
  | { type: "setHasGenderFilter"; payload: { isFiltred: boolean } }
  | { type: "setHasActiveFilter"; payload: { isFiltred: boolean } };

// | { type: "setModalData"; payload: { pokemonDetails: PokemonDetails } }

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "setPokemonList":
      return { ...state, pokemonList: action.payload.pokemonList };
    case "setPositionOnArray":
      return { ...state, positionOnArray: state.positionOnArray + 1 };
    case "setHasNextList":
      return { ...state, hasNextList: !state.hasNextList };
    case "setHasTypeFilter":
      return { ...state, hasActiveFilters: action.payload.isFiltred };
    case "setHasColorFilter":
      return { ...state, hasActiveFilters: action.payload.isFiltred };
    case "setHasGenderFilter":
      return { ...state, hasActiveFilters: action.payload.isFiltred };
    case "setHasActiveFilter":
      return { ...state, hasActiveFilters: action.payload.isFiltred };
    // case "toggleModal":
    //   return { ...state, modalOpen: !state.modaalOpen };
    // case "setModalData":
    //   return { ...state, modalData: action.payload.pokemonDetails };
    default:
      state;
  }
};
