import { useState } from "react";
const useRecipes = () => {
    const [recipes, setRecipes] = useState([]); // search results
    
    async function getRecipes() {
    const res = await fetch("http://localhost:8000/searchedBefore");
    const data = await res.json();
    
    const mapped = data.map(item => item.recipe);
    setRecipes(mapped);
  }

    return { recipes,setRecipes,getRecipes} ;
}
 
export default useRecipes;