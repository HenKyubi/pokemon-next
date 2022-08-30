import { useReducer } from "react";
import { AppState, Pokemon } from "../../interfaces/interfaces";
import { AppContext } from "./app-context";
import { AppReducer } from "./app-reducer";

const INITIAL_STATE: AppState = {
  pokemonList: [],
  positionOnArray: 0,
  hasNextList: false,
  filtred: false,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const AppProvider = ({ children }: Props) => {
  const [appState, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  return (
    <AppContext.Provider
      value={{
        appState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
