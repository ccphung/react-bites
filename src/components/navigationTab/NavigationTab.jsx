import { useRecipe } from "../../contexts/RecipeProvider";
import styles from "./NavigationTab.module.css";
import { Button } from "@mui/material";

function NavigationTab() {
  const { dispatch, showFavorites } = useRecipe();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Button
            variant="contained"
            color={showFavorites ? "default" : "primary"}
            className={showFavorites ? styles.nonActiveTab : styles.activeTab}
            onClick={() => dispatch({ type: "hideFavorites" })}
          >
            Results
          </Button>
        </li>

        <li>
          <Button
            variant="contained"
            color={showFavorites ? "primary" : "default"}
            className={showFavorites ? styles.activeTab : styles.nonActiveTab}
            onClick={() => dispatch({ type: "showFavorites" })}
          >
            Favorites
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationTab;
