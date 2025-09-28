const RecipeDetails = ({recipes}) => {
    return ( 
        <div className="recipeDetails">
            <h1>recipes.name</h1>
            {recipes.map((recipe,id)=>(
                <div key={id}>
                    <h1>{recipe.name}   </h1>
                </div>
            ))}
        </div>
     );
}
 
export default RecipeDetails;