import { AppState, Pokemon, PokemonDetails } from "../../interfaces/interfaces";
type AppActions =
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "toggleModal" }
  | { type: "setModalData"; payload: { pokemonDetails: PokemonDetails } };

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "setPokemonList":
      return { ...state, pokemonList: action.payload.pokemonList };
    // case "toggleModal":
    //   return { ...state, modalOpen: !state.modalOpen };
    // case "setModalData":
    //   return { ...state, modalData: action.payload.pokemonDetails };
    default:
      state;
  }
};
