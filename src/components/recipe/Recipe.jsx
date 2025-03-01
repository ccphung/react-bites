import { Heart } from "lucide-react";
import styles from "./Recipe.module.css";
import { useRecipe } from "../../contexts/RecipeProvider";

function Recipe({ recipe }) {
  const { dispatch, selectedId, favorites } = useRecipe();
  return (
    <li className={`${styles.recipe} `}>
      <button
        className={selectedId === recipe.idMeal ? styles.selectedRecipe : ""}
        onClick={() =>
          dispatch({ type: "selectReceipe", payload: recipe.idMeal })
        }
      >
        <p>{recipe.strMeal}</p>
        <div className={styles.imgContainer}>
          <img src={recipe.strMealThumb} />

          {favorites.map((fav) =>
            fav.idMeal === recipe.idMeal ? (
              <div className={styles.recipeFav} key={fav.idMeal}>
                <Heart fill="#e38a90" color="#e38a90" />
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </button>
    </li>
  );
}

export default Recipe;
