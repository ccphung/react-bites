import { Heart } from "lucide-react";
import styles from "./Recipe.module.css";

function Recipe({ recipe, onSelectRecipe, selectedId, favorites }) {
  return (
    <li
      className={`${styles.recipe} ${
        selectedId === recipe.idMeal ? styles.selectedRecipe : ""
      }`}
      onClick={() => onSelectRecipe(recipe.idMeal)}
    >
      <p>{recipe.strMeal}</p>
      <div className={styles.imgContainer}>
        <img src={recipe.strMealThumb} />

        {favorites.map((fav) =>
          fav.idMeal === recipe.idMeal ? (
            <div className={styles.recipeFav} key={fav.idMeal}>
              <Heart fill="red" color="white" />
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </li>
  );
}

export default Recipe;
