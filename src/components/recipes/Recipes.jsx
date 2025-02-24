import Recipe from "../recipe/Recipe";
import styles from "./Recipes.module.css";

function Recipes({ query, recipes, isLoading, onSelectRecipe, selectedId }) {
  return (
    <div className={styles.recipes}>
      <h3>
        Found {recipes?.length || 0} <strong>results</strong>
      </h3>

      {!isLoading && query.length === 0 && recipes?.length === 0 && (
        <div>Start searching for a recipe...</div>
      )}

      {isLoading && query.length > 3 && <div>Loading ... </div>}

      <ul className={styles.recipesWrapper}>
        {!isLoading &&
          recipes?.map((recipe) => (
            <Recipe
              recipe={recipe}
              onSelectRecipe={onSelectRecipe}
              key={recipe.idMeal}
              selectedId={selectedId}
            />
          ))}
      </ul>
    </div>
  );
}

export default Recipes;
