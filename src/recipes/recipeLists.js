import { stringify } from "postcss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RecipeList = ({recipes}) => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

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
    async function fetchFavourites() {
      try {
        const res = await fetch("http://localhost:8000/favourites");
        const data = await res.json();
        // store just recipe ids
        setFavourites(data.map(fav => fav.recipeId));
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    }

    fetchFavourites();
  }, []);

  // ✅ Add to favourites
  async function addToFavourites(recipeId) {
    try {
      // check if already exists
      if (favourites.includes(recipeId)) return;

      const newFav = { recipeId };
      await fetch("http://localhost:8000/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFav),
      });

      setFavourites(prev => [...prev, recipeId]);
    } catch (error) {
      console.error("Error adding favourite:", error);
    }
  }

  // ✅ Remove from favourites
  async function removeFavourite(recipeId) {
    try {
      // find the object with that recipeId
      const res = await fetch(`http://localhost:8000/favourites?recipeId=${recipeId}`);
      const data = await res.json();

      if (data.length > 0) {
        const favToDelete = data[0];
        await fetch(`http://localhost:8000/favourites/${favToDelete.id}`, {
          method: "DELETE",
        });
        setFavourites(prev => prev.filter(id => id !== recipeId));
      }
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  }

  async function toggleFavourite(recipeId) {
    if (favourites.includes(recipeId)) {
      await removeFavourite(recipeId);
    } else {
      await addToFavourites(recipeId);
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

  return (  
        <>
        <div className="recipe-results">
        <div className="page-header">
          <h1 style={{textAlign:"center",fontSize:"100px",fontFamily:"MyFont"}}>Results:</h1>
          <p>Found {recipes?.length || 0} amazing recipes</p>
        </div>
        
        <div className="recipeList">
          {recipes?.map((recipe, index) => (
            <div 
              key={index} 
              onClick={async (e) => {
                e.preventDefault();
                await handleClick(recipe);
              }} 
              className="recipePer"
            >
              <button
              onClick={async (e) => {
                  e.stopPropagation();
                  toggleFavourite(recipe.id);
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
          ))}
        </div>
      </div>
    </>
    );
} //a glowy heart button should be added and also I should 
// add that glowy effect with keyframes from css
 
export default RecipeList;

//image
//name
//Cuisine
//rating
//
