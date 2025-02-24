import styles from "./SearchBar.module.css";

function SearchBar({ setQuery }) {
  return (
    <input
      className={styles.searchbar}
      placeholder="Search recipes..."
      type="text"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchBar;
