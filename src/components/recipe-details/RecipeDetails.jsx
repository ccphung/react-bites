import { useEffect } from "react";
import styles from "./RecipeDetails.module.css";
import { useRecipe } from "../../contexts/RecipeProvider";

function RecipeDetails({ screen }) {
  const { selectedId, recipe, favorites, error, dispatch } = useRecipe();

  const ingredients = recipe
    ? Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[`strIngredient${i + 1}`];
        const measure = recipe[`strMeasure${i + 1}`];

        return ingredient && ingredient.trim() !== ""
          ? `${measure} ${ingredient}`
          : null;
      }).filter(Boolean)
    : [];

  useEffect(() => {
    async function getRecipeDetails() {
      if (!selectedId) return;

      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedId}`
        );
        const data = await res.json();
        if (data.meals) {
          dispatch({ type: "setReceipe", payload: data.meals[0] });
        } else {
          throw new Error("No recipe found.");
        }
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }

    getRecipeDetails();
  }, [dispatch, selectedId]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (error) return <div className={styles.error}>⚠️ {error}</div>;

  function handleClick(recipe) {
    dispatch({
      type: "toggleFavorite",
      payload: recipe,
    });
  }

  return (
    <div
      className={`${styles.recipeDetails} ${
        screen === "small" ? styles.smallScreen : styles.largeScreen
      }`}
    >
      <h1> Recipe Details ✍️</h1>
      {!selectedId ? (
        <div>Click on a picture to see the recipe</div>
      ) : (
        <>
          <h3>{recipe?.strMeal || "Loading..."}</h3>
          {recipe?.strMealThumb && (
            <div className={styles.recipeDetailImgContainer}>
              <img
                className={styles.recipeDetailImg}
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <button
                className={styles.recipeDetailsFav}
                onClick={() => handleClick(recipe)}
              >
                {favorites.some((fav) => fav.idMeal === selectedId)
                  ? "Added to fav ✅"
                  : "Add to favorites"}
              </button>
            </div>
          )}
          <h3>Ingredients</h3>
          <ul>
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => <li key={index}>{item}</li>)
            ) : (
              <li>Loading ingredients...</li>
            )}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe?.strInstructions || "Loading instructions..."}</p>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
