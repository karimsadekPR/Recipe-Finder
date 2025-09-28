import { useEffect } from "react";
import RecipeList from "./recipeLists";
import useRecipes from "./useRecipes";

const Home = () => {
  const {recipes,getRecipes} = useRecipes()
  
  useEffect(()=>{
    getRecipes();
  },[])

  
  return ( 
    <div className="homePage">
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