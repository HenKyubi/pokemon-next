import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//API
import { getInitialPokemons, getNextPokemons } from "./api/index";

//Lotties
import Lottie from "react-lottie";
import pokeballLoading from "../public/lotties/pikachu.json";

//  Components
import Loading from "../components/loading";
import Navbar from "../components/navbar";
import PokemonList from "../components/pokemon-list";
import PokemonCard from "../components/pokemon-card";
import FilterType from "../components/filter-type";

//Interfaces
import { Pokemon } from "../interfaces/interfaces";
import { AppProvider } from "../context/app/app-provider";

export default function Home() {
  // States
  // const [loading, setLoading] = useState<boolean>(true);
  // const [pokemonList, setPokemonList] = useState<Array<Pokemon>>([]);
  // const [modal, setModal] = useState<boolean>(false);
  // const [positionOnArray, setPositionOnArray] = useState<number>(44);
  // const [hasNext, setHasNext] = useState<boolean>(true);
  // const switchLoading = () => {
  //   setTimeout(() => setLoading(!loading), 5000);
  // };

  // const toggle = () => setModal(!modal);

  const styles = {
    height: "100vh",
    width: "100vw",
  };

  // const fetchInitialPokemons = async () => {
  //   try {
  //     const initialListOfPokemons: Array<Pokemon> = await getInitialPokemons();
  //     setPokemonList(initialListOfPokemons);
  //   } catch (err) {
  //     console.log("err fetchInitialPokemons", err);
  //   }
  // };

  // const getNextList = (): void => {
  //   const next: Array<Pokemon> = getNextPokemons(positionOnArray);
  //   setPokemonList([...pokemonList, ...next]);
  //   setPositionOnArray(positionOnArray + 1);
  //   if (next.length !== 20) {
  //     setHasNext(false);
  //   }
  // };

  useEffect(() => {
    // fetchInitialPokemons();
    // switchLoading();
    // console.log(getInitialPokemons());
  }, []);

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
          <div className="col-3  m-0 p-0 h-100">{/* <FilterType /> */}</div>
          <div className="col-9 m-0 p-0 ">
            <div className="row m-0 p-0 w-100">
              <PokemonList />
              {/* {hasNext && (
                <button
                  onClick={() => {
                    getNextList();
                  }}
                >
                  More Pokemons
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
