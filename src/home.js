import { use, useEffect } from "react";
import RecipeList from "./recipes/recipeLists";
import useRecipes from "./recipes/useRecipes"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const {recipes,getRecipes, bestRecipes, getBestRecipes} = useRecipes()
  const navigate = useNavigate();
  useEffect(()=>{
    getRecipes();
    getBestRecipes();
  },[])

  function handleClick(newRecipe){
    navigate(`/recipeDetails/${newRecipe.id}`,{
      state: {
          recipe: newRecipe 
        }
    }); 
  }
  // I wanna do a swipe effect in going through the routes and not only this but also to have in the 
  // navbar big titles: "Home,favourties,cuisines" and will be highlighted somehow on focus or if a page is selected
  
  return ( 
    <div className="homePage">
     <motion.div className="bestRecipes"
      animate={{x:["0%","-50%"]}}
      transition={{repeat: Infinity, duration: 35, ease:"linear"}}
     >
      <div className="bestRated">
      {bestRecipes.map(bestRecipe => (
      <div onClick={(e)=>{e.preventDefault(); handleClick(bestRecipe)}} key={bestRecipe.id} className="bestRating">
        <img src={bestRecipe.image} alt={bestRecipe.name} />
        <h2>{bestRecipe.name}</h2>
        <div className="rating">⭐ {bestRecipe.rating}</div>
      </div>
    ))}
  </div>
</motion.div>

  <div className="hero-section">
    <div className="floating-shapes">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
    </div>
    
    <div className="hero-content">
      <h1 className="hero-title">You search...</h1>
      <h1 className="hero-title">We cook</h1>
      <p className="hero-subtitle">Discover amazing recipes from around the world</p>
    </div>
  </div>

  {recipes.length > 0 && (
    <div className="searchHistory">
      <h1>Searched Before</h1>
      <RecipeList recipes={recipes} />
    </div>
  )}
</div>
);
}
 
export default Home;