import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function RecipeDetails() {
  const { selectedRecipe } = useContext(RecipeContext);

  return (
    <div className="recipe-details-container">
      <h2 className="section-title">Recipe Details</h2>
      {selectedRecipe ? (
        <div className="recipe-details">
          <h3 className="recipe-title">{selectedRecipe.strMeal}</h3>
          <p className="recipe-instructions">{selectedRecipe.strInstructions}</p>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="recipe-image" />
        </div>
      ) : (
        <p className="recipe-placeholder">Select a recipe to see details.</p>
      )}
    </div>
  );
}

export default RecipeDetails;