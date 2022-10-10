import { createContext } from "react";
import { AppState, Pokemon } from "../../interfaces/interfaces";

type AppContextProps = {
  appState: AppState;
  getInitialGroupOfPokemons: () => void;
  setPokemonList: (pokemonList: Array<Pokemon>) => void;
  setPositionOnArray: () => void;
  setHasNextList: () => void;
  resetAppContext: () => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
