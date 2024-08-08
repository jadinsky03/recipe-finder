import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function RecipeList({ recipes }) {
  const { setSelectedRecipe } = useContext(RecipeContext);

  return (
    <div className="recipe-list-container">
      <h2 className="section-title">Recipe List</h2>
      <ul className="recipe-list">
        {recipes && recipes.map(recipe => (
          <li key={recipe.idMeal} onClick={() => setSelectedRecipe(recipe)} className="recipe-item">
            {recipe.strMeal}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;