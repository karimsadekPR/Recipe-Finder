import { useLocation, useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // in case you still want the id from the URL
  const location = useLocation();
  const recipe = location.state?.recipe;
  
   if (!recipe) {
    return <h2>No recipe found for id: {id}</h2>;
  }

  return ( 
        <div className="recipeDetails">
            <div>
               <img src={recipe.image} alt={recipe.name} />
               <h1>{recipe.name}</h1>
            </div>
        </div>
     );
}
 
export default RecipeDetails;