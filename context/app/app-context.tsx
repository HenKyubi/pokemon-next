import { createContext } from "react";
import { AppState } from "../../interfaces/interfaces";

type AppContextProps = {
  appState: AppState;
};

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
