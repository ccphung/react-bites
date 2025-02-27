import { useEffect, createContext, useContext, useReducer } from "react";

const RecipeContext = createContext();

const initialState = {
  selectedId: null,
  recipe: [],
  recipes: [],
  error: "",
  isLoading: false,
  query: "",
  showFavorites: false,
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataFetch":
      return {
        ...state,
        isLoading: true,
        showFavorites: false,
        error: "",
      };
    case "dataReceived":
      return { ...state, isLoading: false, recipes: action.payload };

    case "dataFailed":
      return { ...state, isLoading: false, error: action.payload };

    case "resetRecipes":
      return { ...state, recipes: [] };

    case "selectReceipe":
      return {
        ...state,
        selectedId: action.payload === state.selectedId ? null : action.payload,
      };
    case "setReceipe":
      return {
        ...state,
        recipe: action.payload,
      };

    case "showFavorites":
      return {
        ...state,
        showFavorites: true,
      };
    case "hideFavorites":
      return {
        ...state,
        showFavorites: false,
      };

    case "searchRecipe":
      return {
        ...state,
        query: action.payload,
      };

    case "toggleFavorite": {
      const isFavorite = state.favorites.some(
        (fav) => fav.idMeal === action.payload.idMeal
      );

      const updatedFavorites = isFavorite
        ? state.favorites.filter((fav) => fav.idMeal !== action.payload.idMeal)
        : [...state.favorites, action.payload];

      return { ...state, favorites: updatedFavorites };
    }

    default:
      throw new Error("Action unknown");
  }
}

function RecipeProvider({ children }) {
  const [
    {
      selectedId,
      recipe,
      recipes,
      error,
      isLoading,
      query,
      showFavorites,
      favorites,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      const controller = new AbortController();
      async function searchRecipes() {
        try {
          dispatch({ type: "dataFetch" });
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          );
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data.meals });
        } catch (err) {
          dispatch({ type: "dataFailed", payload: err.message });
        }
      }
      if (query.length < 3) {
        dispatch({ type: "resetRecipes" });
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
    dispatch({
      type: "selectReceipe",
      payload: id,
    });
  }

  return (
    <RecipeContext.Provider
      value={{
        selectedId,
        recipe,
        recipes,
        error,
        isLoading,
        query,
        onSelectRecipe: handleSelectRecipe,
        showFavorites,
        favorites,
        dispatch,
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
