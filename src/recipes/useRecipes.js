import { useState } from "react";
const useRecipes = () => {
    const [recipes, setRecipes] = useState([]); // search results
    const [favourites, setFavourites] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    async function getRecipes() {
    const res = await fetch("http://localhost:8000/searchedBefore");
    const data = await res.json();
    
    // I want to check from the database first, if the id is included then immedietly the 
    // favourite will be true else false
    const mapped = data.map(r => ({
      ...r.recipe,
    }));
    setRecipes(mapped);
    return data;
  }

  async function fetchFavouritesID() {
      try {
        const res = await fetch("http://localhost:8000/favourites");
        const data = await res.json();
        // store just recipe ids
        setFavourites(data.map(fav => fav.recipeId));
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    }

    async function fetchFavRecipes() {
      try {
        const res = await fetch("http://localhost:8000/favRecipes");
        const data = await res.json();
        const mapped = data.map(r => ({
        ...r.recipe,
        }));
        setFavRecipes(mapped);
        return data
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    }

    return { recipes,setRecipes,getRecipes,fetchFavouritesID,favourites,fetchFavRecipes,favRecipes,setFavourites};
}
 
export default useRecipes;