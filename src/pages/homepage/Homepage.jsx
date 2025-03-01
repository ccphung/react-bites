import styles from "./Homepage.module.css";
import Recipes from "../../components/recipes/recipes";
import RecipeDetails from "../../components/recipe-details/RecipeDetails";
import Favorites from "../../components/favorites/Favorites";
import NavigationTab from "../../components/navigationTab/NavigationTab";
import { useRecipe } from "../../contexts/RecipeProvider";

function Homepage() {
  const { showFavorites, showResults, showRecipeDetails } = useRecipe();
  return (
    <div className={styles.homepage}>
      <div className={styles.homeContainer}>
        <div>
          <NavigationTab />
          {showFavorites && <Favorites />}
          {showResults && <Recipes />}
          {showRecipeDetails && <RecipeDetails screen="small" />}
        </div>
        <RecipeDetails screen="large" />
      </div>
    </div>
  );
}

export default Homepage;
