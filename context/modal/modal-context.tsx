import { createContext } from "react";
import { ModalState } from "../../interfaces/interfaces";

type ModalContextProps = {
  modalState: ModalState
}

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
