import React from "react";

import Image from "next/image";
import Logo from "../public/images/pokemon-logo.png";
import SearchBar from "./searchbar";

const Navbar = () => {
  const styles = {
    nav: {
      height: "10vh",
    },
  };
  return (
    <nav style={styles.nav}>
      <div className="h-100">
        {/* <Image
          src={Logo}
          alt="navbar logo"
          style={styles.nav}
        /> */}
        <SearchBar/>
      </div>
    </nav>
  );
};

export default Navbar;
