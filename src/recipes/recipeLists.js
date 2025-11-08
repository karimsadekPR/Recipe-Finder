import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRecipes from "./useRecipes";
import { motion } from "framer-motion";

const RecipeList = ({recipes}) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [localRecipes,setLocalRecipes] = useState([]);
  const {favourites,setFavourites,fetchFavouritesID,getRecipes,fetchFavRecipes,setRecipes} = useRecipes();

  async function searchHistory(newRecipe) {
    try {
      const res = await fetch("http://localhost:8000/searchedBefore");
      if (!res.ok) throw new Error('Failed to fetch search history');
      
      const history = await res.json();
      const exists = history.some(r => r.recipe.id === newRecipe.id);

      if (!exists) {
        const response = await fetch("http://localhost:8000/searchedBefore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipe: newRecipe,
            date: new Date().toLocaleDateString(),
          }),
        });
        
        if (!response.ok) throw new Error('Failed to save to history');
      }
    } catch (error) {
      console.error("Error in searchHistory:", error);
    }
  }

   useEffect(() => {
    fetchFavouritesID();
  }, []);
  
  

  async function addToFavourites(recipeId,newRecipe) {
    try {
      if (favourites.includes(recipeId)) return;

      await fetch("http://localhost:8000/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
      });

      setFavourites(prev => [...prev, recipeId]);
      
      const recipes = await getRecipes();
      const favsExist = recipes.map(r => r.recipe.id); 
      if(!favsExist.includes(recipeId)){
      await fetch("http://localhost:8000/favRecipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            recipe: newRecipe,
            date: new Date().toLocaleDateString(),
          }),
      })
    }
    } catch (error) {
      console.error("Error adding favourite:", error);
    }
  }

  async function removeFavourite(recipeId) {
  try {
    const favouritesRes = await fetch(`http://localhost:8000/favourites?recipeId=${recipeId}`);//needs to be replaced with the function from useRecipes
    if (!favouritesRes.ok) throw new Error(`Failed to fetch favourites: ${favouritesRes.status}`);
    
    const favouritesData = await favouritesRes.json();
    if (favouritesData.length === 0) {
      console.warn(`No favourite found for recipeId: ${recipeId}`);
      return;
    }

    const favToDelete = favouritesData[0];
    const deleteFavRes = await fetch(`http://localhost:8000/favourites/${favToDelete.id}`, {
      method: "DELETE",
    });

    if (!deleteFavRes.ok) throw new Error(`Failed to delete favourite: ${deleteFavRes.status}`);

    setFavourites(prev => prev.filter(id => id !== recipeId));

    const favRecipes = await fetchFavRecipes();
      
      const favRecipeToDelete = favRecipes.find(r => r.recipe.id === recipeId );

      if (favRecipeToDelete) {
        await fetch(`http://localhost:8000/favRecipes/${favRecipeToDelete.id}`, {
          method: "DELETE",
        });         
      }

    } catch (error) {
    console.error("Error removing favourite:", error);
  }
}
  async function toggleFavourite(recipeId,newRecipe) {
    if (favourites.includes(recipeId)) {
      await removeFavourite(recipeId,newRecipe);
    } else {
      await addToFavourites(recipeId,newRecipe);
    }
  }

  async function handleClick(newRecipe){
    await searchHistory(newRecipe);  
    navigate(`/recipeDetails/${newRecipe.id}`,{
      state: {  // ✅ Add 'state:' property
          recipe: newRecipe // ✅ Use the fetched data directly
        }
    }); // then navigate manually
  }

    useEffect(() => {
    setLocalRecipes(recipes);
  }, [recipes]);

  function handleSort(e) {
    e.preventDefault();
    
    const sorted = [...recipes].sort((a, b) => { //should be optimized if possible
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return order === "asc" ? valueA - valueB : valueB - valueA;
    });
    setLocalRecipes(sorted);
    console.log(sorted)
  }

  return (  
        <>
        <div className="recipe-results">
        <div className="page-header">
          <h1 style={{textAlign:"center",fontSize:"100px",fontFamily:"MyFont"}}>Results:</h1>
          <p>Found {recipes?.length || 0} amazing recipes</p>
        </div>
        <div className="ResultsServicesBar">
          <form onSubmit={handleSort}>
            <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="difficulty">Difficulty</option>
            </select>
          
          <label>
          <input
            type="radio"
            value="asc"
            checked={order === "asc"}
            onChange={(e) => setOrder(e.target.value)}
          />
          Ascending
        </label>

        <label>
          <input
            type="radio"
            value="desc"
            checked={order === "desc"}
            onChange={(e) => setOrder(e.target.value)}
          />
          Descending
        </label>

          <button type="submit">Apply</button>          
          </form>
          </div> 
           <div className="recipeList">
          {localRecipes?.map((recipe, index) => (
          <>
          <motion.div 
                                                  // needs to be inspected again
          key={recipe.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          >

            <div 
              key={index} 
              onClick={async (e) => {
                e.preventDefault();
                await handleClick(recipe);
              }} 
              className="recipePer"
            >
              <button className="heart"
              onClick={async (e) => {
                  e.stopPropagation();
                  toggleFavourite(recipe.id,recipe);
              }}
            > 
              <img 
                src={favourites.includes(recipe.id) ? "./images/fullHeart.png" : "./images/heartEmpty.png"}
                alt="favourite"
              />
            </button>
              <img src={recipe.image} alt={recipe.name} />
              <div className="recipe-info">
                <h2>{recipe.name}</h2>
                <div className="recipe-meta">
                  <span className="cuisine-tag">{recipe.cuisine}</span>
                  <div className="rating">
                    ⭐ {recipe.rating}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </>  
          ))}
        </div>
      </div>
    </>
    );
} 
//a glowy heart button should be added and also I should 
// add that glowy effect with keyframes from css
 
export default RecipeList;

