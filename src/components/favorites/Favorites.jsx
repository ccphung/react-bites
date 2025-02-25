import { Heart } from "lucide-react";
import Recipe from "../recipe/Recipe";
import styles from "./Favorites.module.css";

function Favorites({ setFavorites, favorites, onSelectRecipe, selectedId }) {
  return (
    <div className={styles.favorites}>
      <h3>
        You have {favorites?.length || 0} <strong>favorites</strong>
        <Heart color="green" fill="green" />
      </h3>
      <ul className={styles.favoritesWrapper}>
        {favorites?.map((recipe) => (
          <Recipe
            key={recipe.idMeal}
            recipe={recipe}
            onSelectRecipe={onSelectRecipe}
            selectedId={selectedId}
            favorites={favorites}
          />
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
