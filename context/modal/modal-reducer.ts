import { ModalState, PokemonDetails } from "../../interfaces/interfaces";

type ModalAction =
  | {
      type: "setPokemonDataDetails";
      payload: { pokemonDetailsData: PokemonDetails };
    }
  | {
      type: "toggleModal";
    };

export const ModalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case "toggleModal":
      return {
        ...state,
        modalOpen: !state.modalOpen
      };
    case "setPokemonDataDetails":
      return {
        ...state,
        pokemonDataDetails: action.payload.pokemonDetailsData
      }

    default:
      return state;
  }
};
