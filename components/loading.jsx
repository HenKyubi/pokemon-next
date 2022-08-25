import React from "react";
import Lottie from "react-lottie";
import pokeballLoading from "../public/lotties/pokeball-loading.json";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pokeballLoading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const styles = {
    loading: {
      height: "100vh",
      with: "100vw",
    },
  };

  return (
    <div
      className="row m-0 align-items-center justify-content-center"
      style={styles.loading}
    >
      <div className="col-6 col-md-4 col-lg-3 col-xl-2">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default Loading;
