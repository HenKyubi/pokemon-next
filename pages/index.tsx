import React, { useContext } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";

//  Components
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import PokemonList from "../components/pokemon-list";
import ButtonMorePokemons from "../components/button-more-pokemons";
import FilterType from "../components/filter-type";
import FilterColors from "../components/filter-colors";
import FilterGender from "../components/filter-gender";

// Context
import { AppProvider } from "../context/app/app-provider";
import { ModalProvider } from "../context/modal/modal-provider";
import PokemonModal from "../components/pokemon-modal";
import { AppContext } from "../context/app/app-context";
import { FilterContext } from "../context/filter/filter-context";
import { FilterProvider } from "../context/filter/filter-provider";

export default function Home() {
  // const switchLoading = () => {
  //   setTimeout(() => setLoading(!loading), 5000);
  // };

  // const toggle = () => setModal(!modal);

  const styles = {
    height: "100vh",
    width: "100vw",
  };

  // Context
  const { appState } = useContext(AppContext);
  const { filterState } = useContext(FilterContext);

  return (
    <AppProvider>
      <Head>
        <title>Pokedex NextJs</title>
        <meta name="description" content="Next App" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* {loading && <Loading />} */}
      <div className="container" style={styles}>
        <Navbar />
        <div className="row m-0 p-0 h-100 w-100">
          <div className="col-3  m-0 p-0 h-100">
            <FilterProvider>
              <FilterType />
              <FilterColors />
              <FilterGender />
            </FilterProvider>
          </div>
          <div className="col-9 m-0 p-0 ">
            <div className="row m-0 p-0 w-100">
              <ModalProvider>
                <PokemonModal />
                <PokemonList />
              </ModalProvider>
              {!appState?.hasActiveFilters && <ButtonMorePokemons />}
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
