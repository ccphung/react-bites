import Logo from "../logo/Logo";
import Random from "../random/Random";
import SearchBar from "../searchbar/SearchBar";
import styles from "./Navbar.module.css";

function Navbar({ setQuery, selectedId, setSelectedId }) {
  return (
    <div className={styles.nav}>
      <Logo />
      <SearchBar setQuery={setQuery} />
      <Random selectedId={selectedId} setSelectedId={setSelectedId} />
    </div>
  );
}

export default Navbar;
