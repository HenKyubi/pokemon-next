import { AppState, Pokemon, PokemonDetails } from "../interfaces/types";
type AppActions =
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "toggleModal" }
  | { type: "setModalData"; payload: { pokemonDetails: PokemonDetails } };

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "toggleModal":
      return { ...state, modalOpen: !state.modalOpen };
    case "setPokemonList":
      return { ...state, pokemonList: action.payload.pokemonList };
    case "setModalData":
      return { ...state, modalData: action.payload.pokemonDetails };
    default:
      state;
  }
};
