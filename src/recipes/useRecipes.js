import { useState } from "react";
const useRecipes = () => {
    const [recipes, setRecipes] = useState([]); // search results
    
    async function getRecipes() {
    const res = await fetch("http://localhost:8000/searchedBefore");
    const data = await res.json();
    
    // I want to check from the database first, if the id is included then immedietly the 
    // favourite will be true else false
    const mapped = data.map(r => ({
      ...r.recipe,
    }));
    setRecipes(mapped);
  }

    return { recipes,setRecipes,getRecipes};
}
 
export default useRecipes;