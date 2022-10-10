import { useReducer } from "react";
import { AppState, Pokemon } from "../../interfaces/interfaces";
import { AppContext } from "./app-context";
import { AppReducer } from "./app-reducer";

const INITIAL_STATE: AppState = {
  pokemonList: [],
  positionOnArray: 1,
  hasNextList: true,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const AppProvider = ({ children }: Props) => {
  const [appState, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const getInitialGroupOfPokemons = () => {
    dispatch({ type: "getInitialGroupOfPokemons" });
  };
  const setPokemonList = (pokemonList: Array<Pokemon>) => {
    dispatch({ type: "setPokemonList", payload: { pokemonList } });
  };
  const setPositionOnArray = () => {
    dispatch({ type: "setPositionOnArray" });
  };
  const setHasNextList = () => {
    dispatch({ type: "setHasNextList" });
  };
  const resetAppContext = () => {
    dispatch({ type: "resetAppContext" });
  };
  return (
    <AppContext.Provider
      value={{
        appState,
        getInitialGroupOfPokemons: getInitialGroupOfPokemons,
        setPokemonList,
        setPositionOnArray,
        setHasNextList,
        resetAppContext: resetAppContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
