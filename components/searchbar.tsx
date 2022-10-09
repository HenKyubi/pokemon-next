import React, { useContext } from "react";
import { FilterContext } from "../context/filter/filter-context";
import { getPokemonsBySearch } from "../pages/api/index";

const SearchBar = () => {
  // Context
  const {
    filterState,
    filter,
    setPokemonListFiltredBySearch,
    setHasFilterSearch,
    validateIfHasActiveFilters,
  } = useContext(FilterContext);

  // search
  const handleOnChange = (word: string) => {
    const pokemonListFiltred = getPokemonsBySearch(word);
    word.length > 0 ? setHasFilterSearch(true) : setHasFilterSearch(false);
    validateIfHasActiveFilters();
    setPokemonListFiltredBySearch(pokemonListFiltred);
    filter();
  };

  return (
    <div className="d-flex form-search align-items-center">
      <i className="fas fa-search"></i>
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(event) => handleOnChange(event.target.value)}
        list="dataListPokemons"
      />
      <datalist id="dataListPokemons">
        {filterState.pokemonListFiltredBySearch.map((item, index) => {
          return (
            <option
              key={index}
              aria-labelledby="Search"
              value={item?.namePokemon}
            />
          );
        })}
      </datalist>
    </div>
  );
};

export default SearchBar;
