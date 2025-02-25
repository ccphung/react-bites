import { useState, useEffect, createContext, useContext } from "react";

const RecipeContext = createContext();

function RecipeProvider({ children }) {
  const [selectedId, setSelectedId] = useState(null);
  const [recipe, setRecipe] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (!storedFavorites) {
      return [];
    }
    try {
      return JSON.parse(storedFavorites);
    } catch (error) {
      console.error("Erreur lors duError with parsing favorites", error);
      return [];
    }
  });

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
    <RecipeContext.Provider
      value={{
        selectedId,
        setSelectedId,
        recipe,
        setRecipe,
        recipes,
        setRecipes,
        error,
        setError,
        isLoading,
        setIsLoading,
        query,
        setQuery,
        onSelectRecipe: handleSelectRecipe,
        showFavorites,
        setShowFavorites,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

function useRecipe() {
  const context = useContext(RecipeContext);
  if (context === undefined)
    throw new Error("RecipeContext was used outside of the RecipeProvider");
  return context;
}

export { RecipeProvider, useRecipe };
