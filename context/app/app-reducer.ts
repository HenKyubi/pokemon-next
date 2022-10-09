import { AppState, Pokemon } from "../../interfaces/interfaces";
type AppActions =
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "setPositionOnArray" }
  | { type: "setHasNextList" };

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "setPokemonList":
      return { ...state, pokemonList: action.payload.pokemonList };
    case "setPositionOnArray":
      return { ...state, positionOnArray: state.positionOnArray + 1 };
    case "setHasNextList":
      return { ...state, hasNextList: !state.hasNextList };
    default:
      state;
  }
};
