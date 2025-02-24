import Logo from "../logo/Logo";
import SearchBar from "../searchbar/SearchBar";
import styles from "./Navbar.module.css";

function Navbar({ setQuery }) {
  return (
    <div className={styles.nav}>
      <Logo />
      <SearchBar setQuery={setQuery} />
    </div>
  );
}

export default Navbar;
