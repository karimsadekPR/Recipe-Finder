import { useState } from "react";
const useRecipes = () => {
    const [recipes, setRecipes] = useState([]); // search results
    const [favourites, setFavourites] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [bestRecipes, setBestRecipes] = useState([])

    async function getRecipes() {
    const res = await fetch("http://localhost:8000/searchedBefore");
    const data = await res.json();
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

    async function getBestRecipes() {
      try{
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      
      const sorted = data.recipes
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10); 

      setBestRecipes(sorted) //
      }catch(error){
        console.error("Error fetching favourites:", error);
      }
    }

    return { recipes,setRecipes,getRecipes,fetchFavouritesID,favourites,fetchFavRecipes,
             favRecipes,setFavourites,getBestRecipes,bestRecipes};
}
 
export default useRecipes;