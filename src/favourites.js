import { useEffect, useState } from "react";
import RecipeList from "./recipes/recipeLists";
import useRecipes from "./recipes/useRecipes";

const Favourites = () => {
    const { getRecipes, favourites, fetchFavouritesID, fetchFavRecipes, favRecipes, recipes} = useRecipes();
    const [combinedRecipes, setCombined] = useState([]);
    useEffect(() => {
        getRecipes();
        fetchFavRecipes();
        fetchFavouritesID();
}, []);


  useEffect(() => {
  if (favourites.length > 0 && recipes.length > 0) {
    
    const filteredRecipes = recipes.filter((r) => favourites.includes(r.id));
    console.log("the favs from recipes: ",filteredRecipes)
     const allFavs = [...filteredRecipes, ...favRecipes];
     const uniqueCombinedRecipes = allFavs.filter(
        (r, index, self) => index === self.findIndex((x) => x.id === r.id)
      );
    setCombined(uniqueCombinedRecipes);
  } else {
    console.log("⚠️ Condition not met — skipping combine.");
  }
}, [favRecipes, favourites, recipes]);

    if (!combinedRecipes || combinedRecipes.length === 0) return <div>NO recipes found</div>;

    //use Favourite to edit and add the favourites by comparing if the 
    // recipes exist by getting them somehow no idea how though since 
    // since at the moment I either will use the searchedBefore 
    // or just unfourtanatlly save it in another place which will be realllly reallllly bad 
    // cause it would change a bit in my memory effiency, bro I really don't know

    
    return (    
        <RecipeList recipes={combinedRecipes}/>
     );
}
 
export default Favourites;