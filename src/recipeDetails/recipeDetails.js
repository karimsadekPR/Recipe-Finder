import { useLocation, useParams } from "react-router-dom";
import "./recipedetails.css";


const RecipeDetails = () => {
  const { id } = useParams(); // in case you still want the id from the URL
  const location = useLocation();
  const recipe = location.state?.recipe;
  
   if (!recipe) {
    return <h2>No recipe found for id: {id}</h2>;
  }

  return ( 
      <div className="recipeDetails">
      <div className="recipe-card">
         {/* Hero Image Section */}
         <div className="recipeCardImg">
            <img src={recipe.image} alt={recipe.name} />
            <h1>{recipe.name}</h1>
         </div>
         
         {/* Meta Information */}
         <div className="recipe-meta">
            <h3>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes total</h3>
            <span className="difficulty-tag">Difficulty: {recipe.difficulty}</span>
            <span className="cuisine-tag">{recipe.cuisine} Cuisine</span>
         </div>

         {/* Main Content - Ingredients & Instructions */}
         <div className="recipe-content">
            {/* Ingredients Column */}
            <div className="ingredients-section">
               <h2>📝 Ingredients</h2>
               <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, id) => (
                     <li key={id}>{ingredient}</li>
                  ))}
               </ul>
            </div>
            
            {/* Instructions Column */}
            <div className="instructions-section">
               <h2>👨‍🍳 Instructions</h2>
               <div className="instructions-text">
                  {recipe.instructions}
               </div>
            </div>
         </div>
         </div>
      </div>
);
}
 
export default RecipeDetails;