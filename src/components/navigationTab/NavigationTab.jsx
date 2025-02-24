import styles from "./NavigationTab.module.css";

function NavigationTab({ showFavorites, setShowFavorites }) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li
          className={`${
            showFavorites ? styles.nonActiveTab : styles.activeTab
          }`}
        >
          <button onClick={() => setShowFavorites(false)}>Results</button>
        </li>
        <span>|</span>
        <li
          className={`${
            showFavorites ? styles.activeTab : styles.nonActiveTab
          }`}
        >
          <button onClick={() => setShowFavorites(true)}>Favorites</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationTab;
