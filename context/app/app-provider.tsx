import { useReducer } from "react";
import { AppState, Pokemon } from "../interfaces/types";
import { AppContext } from "./app-context";
import { AppReducer } from "./app-reducer";

const INITIAL_STATE: AppState = {
  pokemonList: [],
  modalOpen: false,
  modalData: undefined
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const AppProvider = ({ children }: Props) => {
  const [appState, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const toogleModal = () => {
    dispatch({ type: "toggleModal" });
  };
  return (
    <AppContext.Provider value={{ appState   }}>
      {children}
    </AppContext.Provider>
  );
};
