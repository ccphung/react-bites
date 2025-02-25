import styles from "./Homepage.module.css";
import Recipes from "../../components/recipes/recipes";
import RecipeDetails from "../../components/recipe-details/RecipeDetails";
import Favorites from "../../components/favorites/Favorites";
import NavigationTab from "../../components/navigationTab/NavigationTab";
import { useRecipe } from "../../contexts/RecipeProvider";

function Homepage() {
  const { showFavorites } = useRecipe();
  return (
    <div className={styles.homepage}>
      <div className={styles.homeContainer}>
        <div>
          <NavigationTab />
          {showFavorites ? <Favorites /> : <Recipes />}
        </div>
        <RecipeDetails />
      </div>
    </div>
  );
}

export default Homepage;
