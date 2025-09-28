import { Link, useNavigate } from "react-router-dom";

const RecipeList = ({recipes}) => {
  const navigate = useNavigate();

  async function searchHistory(newRecipe) {
  const res = await fetch("http://localhost:8000/searchedBefore");
  const history = await res.json();
  
  // Check if recipe already exists
  const exists = history.some(r => r.recipe.id === newRecipe.id);

  if (!exists) {
    await fetch("http://localhost:8000/searchedBefore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe: newRecipe,
        date: new Date().toLocaleDateString(),
      }),
    });
    console.log("✅ Saved:", newRecipe.name);
  } else {
    console.log("⚠️ Already in history:", newRecipe.name);
  }
}
  
  async function handleClick(newRecipe){
    await searchHistory(newRecipe);  
    navigate(`/recipeDetails/${newRecipe.id}`,{
      state: {  // ✅ Add 'state:' property
          recipes: recipes // ✅ Use the fetched data directly
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
