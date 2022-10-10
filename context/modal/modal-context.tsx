import { createContext } from "react";
import { ModalState, PokemonDetails } from "../../interfaces/interfaces";

type ModalContextProps = {
  modalState: ModalState;
  toggleModal: () => void;
  setPokemonDataDetails: (pokemonDataDetails: PokemonDetails) => void;
  resetModalContext: () => void;
};

export const ModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps
);
