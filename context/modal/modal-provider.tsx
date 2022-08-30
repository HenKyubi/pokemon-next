import { useReducer } from "react";
import { ModalState } from "../../interfaces/interfaces";
import { ModalContext } from "./modal-context";
import { ModalReducer } from "./modal-reducer";

const INITIAL_STATE: ModalState = {
  modalOpen: false,
  modalData: undefined,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(ModalReducer, INITIAL_STATE);
  return (
    <ModalContext.Provider value={{modalState}}>{children}</ModalContext.Provider>
  );
};
 