import { createContext } from "react";
import { AppState } from "../../interfaces/interfaces";

type AppContextProps = {
  appState: AppState;
  toggleModal: boolean;
  positionOnArray: number;
  hasNext: boolean;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
