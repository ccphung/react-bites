import { Heart } from "lucide-react";
import Recipe from "../recipe/Recipe";
import styles from "./Favorites.module.css";
import { useRecipe } from "../../contexts/RecipeProvider";

function Favorites() {
  const { favorites } = useRecipe();
  return (
    <div className={styles.favorites}>
      <h3>
        You have {favorites?.length || 0}{" "}
        {favorites?.length === 1 && (
          <>
            <strong>favorite</strong> <Heart color="#e38a95" fill="#e38a95" />
          </>
        )}
        {favorites?.length === 0 && <strong>favorite 😫 </strong>}
        {favorites?.length > 1 && (
          <>
            <strong>favorites</strong> <Heart color="#e38a95" fill="#e38a95" />
          </>
        )}
      </h3>
      <ul className={styles.favoritesWrapper}>
        {favorites?.map((recipe) => (
          <Recipe key={recipe.idMeal} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
