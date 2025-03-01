import { useRecipe } from "../../contexts/RecipeProvider";
import styles from "./NavigationTab.module.css";
import { Button } from "@mui/material";

function NavigationTab() {
  const { dispatch, showFavorites, showRecipeDetails, showResults } =
    useRecipe();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Button
            variant="contained"
            color={showResults ? "primary" : "default"}
            className={showResults ? styles.activeTab : styles.nonActiveTab}
            onClick={() => dispatch({ type: "showResults" })}
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
        <li className={styles.recipeDetailsBtn}>
          <Button
            variant="contained"
            color={showRecipeDetails ? "primary" : "default"}
            className={
              showRecipeDetails ? styles.activeTab : styles.nonActiveTab
            }
            onClick={() => dispatch({ type: "showRecipeDetails" })}
          >
            Recipe
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationTab;
