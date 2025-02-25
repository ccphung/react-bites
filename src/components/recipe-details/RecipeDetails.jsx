import { useEffect } from "react";
import styles from "./RecipeDetails.module.css";
import { useRecipe } from "../../contexts/RecipeProvider";

function RecipeDetails() {
  const {
    selectedId,
    setRecipe,
    recipe,
    setFavorites,
    favorites,
    error,
    setError,
  } = useRecipe();

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
        setError(""); // Réinitialiser l'erreur
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedId}`
        );

        if (!res.ok) throw new Error("Failed to fetch recipe details.");

        const data = await res.json();
        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          throw new Error("No recipe found.");
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getRecipeDetails();
  }, [selectedId, setRecipe]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (error) return <div className={styles.error}>⚠️ {error}</div>;

  function handleClick() {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.idMeal === selectedId)
        ? prevFavorites.filter((fav) => fav.idMeal !== selectedId)
        : [...prevFavorites, recipe]
    );
    console.log(favorites);
  }

  return (
    <div className={styles.recipeDetails}>
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
              <button className={styles.recipeDetailsFav} onClick={handleClick}>
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
