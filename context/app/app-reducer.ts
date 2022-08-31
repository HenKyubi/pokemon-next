import { AppState, Pokemon, PokemonDetails } from "../../interfaces/interfaces";
type AppActions =
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "setPositionOnArray" }
  | { type: "setHasNextList" };
// | { type: "setModalData"; payload: { pokemonDetails: PokemonDetails } }

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "setPokemonList":
      return { ...state, pokemonList: action.payload.pokemonList };
    case "setPositionOnArray":
      return { ...state, positionOnArray: state.positionOnArray + 1 };
    case "setHasNextList":
      return { ...state, hasNextList: !state.hasNextList };
    // case "toggleModal":
    //   return { ...state, modalOpen: !state.modaalOpen };
    // case "setModalData":
    //   return { ...state, modalData: action.payload.pokemonDetails };
    default:
      state;
  }
};
