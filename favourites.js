import { useEffect } from "react";
import RecipeList from "./src/recipes/recipeLists";
import useRecipes from "./src/recipes/useRecipes";

const Favourites = () => {
    const {recipes,getRecipes} = useRecipes
    useEffect(()=>{
        getRecipes();
    },[])

    return ( 
        <RecipeList recipes={recipes}/>
     );
}
 
export default Favourites;