import { useReducer } from "react";
import { AppState, Pokemon } from "../../interfaces/interfaces";
import { AppContext } from "./app-context";
import { AppReducer } from "./app-reducer";

const INITIAL_STATE: AppState = {
  pokemonList: [],
  positionOnArray: 1,
  hasNextList: true,
  hasTypeFilter: false,
  hasColorFilter: false,
  hasGenderFilter: false,
  hasActiveFilters: false,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const AppProvider = ({ children }: Props) => {
  const [appState, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const setPokemonList = (pokemonList: Array<Pokemon>) => {
    dispatch({ type: "setPokemonList", payload: { pokemonList } });
  };
  const setPositionOnArray = () => {
    dispatch({ type: "setPositionOnArray" });
  };
  const setHasNextList = () => {
    dispatch({ type: "setHasNextList" });
  };
  // const setHasTypeFilter = (isFiltred: boolean) => {
  //   dispatch({ type: "setHasTypeFilter", payload: { isFiltred } });
  // };
  // const setHasColorFilter = (isFiltred: boolean) => {
  //   dispatch({ type: "setHasColorFilter", payload: { isFiltred } });
  // };
  // const setHasGenderFilter = (isFiltred: boolean) => {
  //   dispatch({ type: "setHasGenderFilter", payload: { isFiltred } });
  // };
  // const validateIfHasActiveFilters = () => {
  //   dispatch({ type: "validateIfHasActiveFilters" });
  // };
  return (
    <AppContext.Provider
      value={{
        appState,
        setPokemonList,
        setPositionOnArray,
        // setHasNextList,
        // setHasTypeFilter: setHasTypeFilter,
        // setHasColorFilter: setHasColorFilter,
        // setHasGenderFilter: setHasGenderFilter,
        // validateIfHasActiveFilters: validateIfHasActiveFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
