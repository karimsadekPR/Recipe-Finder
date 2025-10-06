import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipes from "./recipes/useRecipes"

const Header = () => {
  const [query, setQuery] = useState("");   // input text
  const{recipes, setRecipes} = useRecipes(); // search results
  const navigate = useNavigate()

  async function searchForRecipe(searchQuery) {
    try {
      const res = await fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`);
      const data = await res.json();
      console.log(data);
      const response = await fetch("http://localhost:8000/favourites");
      const favsData = await response.json();
      const mapped = data.recipes.map(r => ({
      ...r,
      favourite: (favsData.includes(r.id) ? true : false) 
    }));
      setRecipes(mapped);
      console.log(recipes); // delete then
      
      navigate(`/recipeResults`, {
        state: {  // ✅ Add 'state:' property
          recipes: recipes // ✅ Use the fetched data directly
        }
      });
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim() !== "") {
      searchForRecipe(query);
    }
  }

  return (
   <div className="headerCom">
    <form onSubmit={handleSubmit} className="search-form">
        <input
        type="text"
        value={query}
        placeholder="search for your plate of today..."
        onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
    </form>

    </div>
  );
};

export default Header;
