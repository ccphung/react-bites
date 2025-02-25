import { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import Recipes from "../../components/recipes/recipes";
import RecipeDetails from "../../components/recipe-details/RecipeDetails";
import Favorites from "../../components/favorites/Favorites";
import NavigationTab from "../../components/navigationTab/NavigationTab";

function Homepage({
  query,
  showFavorites,
  setShowFavorites,
  selectedId,
  setSelectedId,
}) {
  const [recipe, setRecipe] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function searchRecipes() {
        try {
          setIsLoading(false);
          setShowFavorites(false);
          setError("");
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          );
          const data = await res.json();
          setRecipes(data.meals);
          console.log(data.meals);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setRecipes([]);
        setSelectedId("");
        return;
      }
      searchRecipes();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  function handleSelectRecipe(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  return (
    <div className={styles.homepage}>
      <div className={styles.homeContainer}>
        <div>
          <NavigationTab
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />
          {showFavorites ? (
            <Favorites
              favorites={favorites}
              onSelectRecipe={handleSelectRecipe}
              selectedId={selectedId}
              setFavorites={setFavorites}
            />
          ) : (
            <Recipes
              query={query}
              recipes={recipes}
              isLoading={isLoading}
              onSelectRecipe={handleSelectRecipe}
              selectedId={selectedId}
              favorites={favorites}
            />
          )}
        </div>
        <RecipeDetails
          selectedId={selectedId}
          setRecipe={setRecipe}
          recipe={recipe}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      </div>
    </div>
  );
}

export default Homepage;
