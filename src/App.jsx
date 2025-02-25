import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import { RecipeProvider } from "./contexts/RecipeProvider";

function App() {
  return (
    <RecipeProvider>
      <Navbar />
      <Homepage />
    </RecipeProvider>
  );
}

export default App;
