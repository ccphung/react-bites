import styles from "./Random.module.css";
import { ShuffleOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecipe } from "../../contexts/RecipeProvider";

function Random() {
  const { dispatch } = useRecipe();
  const [clicked, setClicked] = useState(false);

  useEffect(
    function () {
      if (!clicked) return;
      async function getRandom() {
        try {
          const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const data = await res.json();
          dispatch({ type: "selectReceipe", payload: data.meals[0].idMeal });
        } catch (err) {
          dispatch({ type: "dataFailed", payload: err.message });
        } finally {
          setClicked(false);
        }
      }
      getRandom();
    },
    [clicked, dispatch]
  );

  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        onClick={() => setClicked(true)}
        sx={{
          backgroundColor: "#b2967d",
        }}
        className={styles.button}
      >
        <ShuffleOutlined className={styles.icon} />
        Random recipe
      </Button>
    </div>
  );
}

export default Random;
