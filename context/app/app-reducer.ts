import { AppState, Pokemon } from "../../interfaces/interfaces";
type AppActions =
  | { type: "setPokemonList"; payload: { pokemonList: Array<Pokemon> } }
  | { type: "setPositionOnArray" }
  | { type: "setHasNextList" }
  | { type: "setHasTypeFilter"; payload: { isFiltred: boolean } }
  | { type: "setHasColorFilter"; payload: { isFiltred: boolean } }
  | { type: "setHasGenderFilter"; payload: { isFiltred: boolean } }
  | { type: "validateIfHasActiveFilters" };

// | { type: "setModalData"; payload: { pokemonDetails: PokemonDetails } }

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "setPokemonList":
      if (state.hasActiveFilters) {
        let newPokemonList = action.payload.pokemonList.filter(
          (pokemon) =>
            {
              // console.log(pokemon)
              // console.log(state.pokemonList.find((poke)=>poke.idPokemon===pokemon.idPokemon))
              return state.pokemonList.find(
                (poke) => poke.idPokemon === pokemon.idPokemon
              );
          }
        );
        // console.log(newPokemonList)
        return { ...state, pokemonList: newPokemonList };
      } else {
        return { ...state, pokemonList: action.payload.pokemonList };
      }
    case "setPositionOnArray":
      return { ...state, positionOnArray: state.positionOnArray + 1 };
    case "setHasNextList":
      return { ...state, hasNextList: !state.hasNextList };
    case "setHasTypeFilter":
      return { ...state, hasTypeFilter: action.payload.isFiltred };
    case "setHasColorFilter":
      return { ...state, hasColorFilter: action.payload.isFiltred };
    case "setHasGenderFilter":
      return { ...state, hasGenderFilter: action.payload.isFiltred };
    case "validateIfHasActiveFilters":
      if (
        state.hasTypeFilter ||
        state.hasColorFilter ||
        state.hasGenderFilter
      ) {
        return { ...state, hasActiveFilters: true };
      } else {
        return { ...state, hasActiveFilters: false };
      }
    // case: "":
    // return {};
    default:
      state;
  }
};
