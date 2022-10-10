import React, { useContext } from "react";
import { AppContext } from "../context/app/app-context";
import { FilterContext } from "../context/filter/filter-context";
import { ModalContext } from "../context/modal/modal-context";
const ButtonReset = () => {
  const { resetFilterContext } = useContext(FilterContext);
  const { resetAppContext } = useContext(AppContext);
  const { resetModalContext } = useContext(ModalContext);

  const reset = () => {
    resetFilterContext();
    resetModalContext();
    resetAppContext();
  };

  return (
    <>
      <button onClick={() => reset()}>RESET</button>
    </>
  );
};

export default ButtonReset;
