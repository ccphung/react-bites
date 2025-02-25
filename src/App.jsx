import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";

function App() {
  const [query, setQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Navbar
        setQuery={setQuery}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <Homepage
        query={query}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
}

export default App;
