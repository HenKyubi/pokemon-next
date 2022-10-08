import { createContext } from "react";
import { AppState, Pokemon } from "../../interfaces/interfaces";

type AppContextProps = {
  appState: AppState;
  setPokemonList: (pokemonList: Array<Pokemon>) => void;
  setPositionOnArray: () => void;
  // setHasNextList: () => void;
  // setHasTypeFilter: (isFiltred: boolean) => void;
  // setHasColorFilter: (isFiltred: boolean) => void;
  // setHasGenderFilter: (isFiltred: boolean) => void;
  // validateIfHasActiveFilters: () => void;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
