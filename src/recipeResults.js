import RecipeList from "./recipeLists";
import { useLocation } from 'react-router-dom';

const RecipeResults = () => {
  const location = useLocation();
  const recipes = location.state?.recipes;
  
  return ( 
    <div>
      <RecipeList recipes={recipes} />
    </div>
  );
}
 
export default RecipeResults;

// either taking the query value from a useFetch 
// or a useRecipes file or maybe we can do fetching to it