import Logo from "../logo/Logo";
import Random from "../random/Random";
import SearchBar from "../searchbar/SearchBar";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.nav}>
      <Logo />
      <SearchBar />
      <Random />
    </div>
  );
}

export default Navbar;
