export interface Pokemon {
  idPokemon: number;
  namePokemon: string;
}

// export interface PokemonDetails {
//   data: PokemonData;
//   species: PokemonSpecies;
//   img?: string;
// }

export interface PokemonDetails {
  imgPokemon?: string;
  namePokemon: string;
  idPokemon: number;
  description: string;
  height: number;
  weight: number;
  category: string;
  gender: string;
  habitat: string;
  color: string;
  types: Array<string>;
  evolution: string;
  // evolution: Array<string>;
}
