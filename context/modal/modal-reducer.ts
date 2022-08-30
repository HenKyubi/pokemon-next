import { ModalState, PokemonDetails } from "../../interfaces/interfaces";

type ModalAction =
  | { type: "setModalPokemonData" }
  | {
      type: "toggleModal";
      payload: { pokemonDetailsData: PokemonDetails };
    };

export const ModalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "toggleModal":
      return {
        modalOpen: !state.modalOpen,
        modalData: action.payload.pokemonDetailsData,
      };

    default:
      return state;
  }
};
