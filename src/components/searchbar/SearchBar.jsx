import { useRecipe } from "../../contexts/RecipeProvider";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const { dispatch } = useRecipe();
  return (
    <input
      className={styles.searchbar}
      placeholder="Search recipes..."
      type="text"
      onChange={(e) =>
        dispatch({ type: "searchRecipe", payload: e.target.value })
      }
    />
  );
}

export default SearchBar;
