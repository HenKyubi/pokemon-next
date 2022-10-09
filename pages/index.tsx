import React, { useContext } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";

//  Components
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import PokemonList from "../components/pokemon-list";
import PokemonModal from "../components/pokemon-modal";
import ButtonMorePokemons from "../components/button-more-pokemons";
import FilterType from "../components/filter-type";
import FilterColors from "../components/filter-colors";
import FilterGender from "../components/filter-gender";

// Providers
import { AppProvider } from "../context/app/app-provider";
import { ModalProvider } from "../context/modal/modal-provider";
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

  return (
    <AppProvider>
      <FilterProvider>
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
              <FilterType />
              <FilterColors />
              <FilterGender />
            </div>
            <div className="col-9 m-0 p-0 ">
              <div className="row m-0 p-0 w-100">
                <ModalProvider>
                  <PokemonModal />
                  <PokemonList />
                </ModalProvider>
                <ButtonMorePokemons />
              </div>
            </div>
          </div>
        </div>
      </FilterProvider>
    </AppProvider>
  );
}
