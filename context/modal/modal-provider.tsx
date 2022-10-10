import { useReducer } from "react";
import { ModalState, PokemonDetails } from "../../interfaces/interfaces";
import { ModalContext } from "./modal-context";
import { ModalReducer } from "./modal-reducer";

const INITIAL_STATE: ModalState = {
  modalOpen: false,
  pokemonDataDetails: undefined,
};

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}
export const ModalProvider = ({ children }: Props) => {
  const [modalState, dispatch] = useReducer(ModalReducer, INITIAL_STATE);

  const toggleModal = () => {
    dispatch({ type: "toggleModal" });
  };

  const setPokemonDataDetails = (pokemonDetailsData: PokemonDetails) => {
    dispatch({
      type: "setPokemonDataDetails",
      payload: { pokemonDetailsData },
    });
  };

  const resetModalContext = () => {
    dispatch({ type: "resetModalContext" });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        toggleModal,
        setPokemonDataDetails,
        resetModalContext: resetModalContext,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
