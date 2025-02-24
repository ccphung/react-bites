import styles from "./Recipe.module.css";

function Recipe({ recipe, onSelectRecipe, selectedId }) {
  return (
    <li
      className={`${styles.recipe} ${
        selectedId === recipe.idMeal ? styles.selectedRecipe : ""
      }`}
      onClick={() => onSelectRecipe(recipe.idMeal)}
    >
      <p>{recipe.strMeal}</p>
      <img src={recipe.strMealThumb} />
    </li>
  );
}

export default Recipe;
