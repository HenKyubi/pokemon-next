import { AppState, Pokemon } from "../../interfaces/interfaces";
import { getInitialGroupOfPokemons } from "../../pages/api/index";
type AppActions =
  | { type: "getInitialGroupOfPokemons" }
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "setPositionOnArray" }
  | { type: "setHasNextList" }
  | { type: "resetAppContext" };

const getInitialListOfPokemons = () => {
  try {
    const initialListOfPokemons: Array<Pokemon> = getInitialGroupOfPokemons();
    return initialListOfPokemons;
  } catch (err) {
    console.log("err fetchInitialPokemons", err);
  }
};
export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "getInitialGroupOfPokemons":
      return { ...state, pokemonList: getInitialListOfPokemons() };
    case "setPokemonList":
      return { ...state, pokemonList: action.payload.pokemonList };
    case "setPositionOnArray":
      return { ...state, positionOnArray: state.positionOnArray + 1 };
    case "setHasNextList":
      return { ...state, hasNextList: !state.hasNextList };
    case "resetAppContext":
      return {
        pokemonList: getInitialListOfPokemons(),
        positionOnArray: 1,
        hasNextList: true,
      };
    default:
      state;
  }
};
