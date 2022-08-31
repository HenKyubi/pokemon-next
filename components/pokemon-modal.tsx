import React, { useContext } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

// Context
import { ModalContext } from "../context/modal/modal-context";
import Image from "../node_modules/next/image";

// Components
import PokemonEvolution from "./pokemon-evolution";
const PokemonModal = () => {
  const { modalState, toggleModal } = useContext(ModalContext);
  const { modalOpen, pokemonDataDetails } = modalState;
  return (
    <Modal isOpen={modalOpen} toggle={() => toggleModal()}>
      <ModalHeader toggle={() => toggleModal()}></ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-12 col-md-6">
            <Image
              src={pokemonDataDetails?.imgPokemon}
              alt={pokemonDataDetails?.namePokemon}
              className="w-100"
              layout="fill"
              priority={true}
            />
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-center justify-content-md-start">
              <h2>{pokemonDataDetails?.namePokemon}</h2>
              <div className="px-3">{pokemonDataDetails?.idPokemon}</div>
            </div>
            <p>{pokemonDataDetails?.description}</p>
            <table className="table table-striped table-hover">
              <tr>
                <th>Height:</th>
                <td>{pokemonDataDetails?.height} m</td>
              </tr>
              <tr>
                <th>Weight:</th>
                <td>{pokemonDataDetails?.weight} Kg</td>
              </tr>
              <tr>
                <th>Category:</th>
                <td>{pokemonDataDetails?.category}</td>
              </tr>
              <tr>
                <th>Gender:</th>
                <td>{pokemonDataDetails?.gender}</td>
              </tr>
              <tr>
                <th>Habitat:</th>
                <td>{pokemonDataDetails?.habitat}</td>
              </tr>
              <tr>
                <th>Color:</th>
                <td>{pokemonDataDetails?.color}</td>
              </tr>
            </table>
            <h4>Types:</h4>
            <div className="d-flex">
              {pokemonDataDetails?.types.map((type, index) => {
                return (
                  <div className="col-6 col-lg-4" key={index}>
                    <div className="tag border border-3 ms-3 ps-3 ">{type}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <h3>Evolution</h3>
        {/* <PokemonEvolution/> */}
        <p>This pokemon does not evolve</p>
      </ModalFooter>
    </Modal>
  );
};

export default PokemonModal;
