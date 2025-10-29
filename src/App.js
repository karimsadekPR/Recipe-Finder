import Header from "./header";
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./home";
import RecipeResults from "./recipes/recipeResults"
import RecipeDetails from "./recipeDetails/recipeDetails";
import Cuisines from "./cuisines";
import Favourites from "./favourites";
function App() {
  return (
    <Router>
      <header>
        <div className="header">
          <Header />
          <div className="pagesLinks">
            <Link to="/">Home</Link>
            <Link to="/favourites">Favourites</Link>
            <Link to="/cuisines">Cuisines</Link>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipeResults" element={<RecipeResults />} />
        <Route path="/recipeDetails/:id" element={<RecipeDetails />} />
        <Route path="/cuisines" element={<Cuisines />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
