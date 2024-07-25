import React, { useState, createContext, useContext } from 'react';
import './index.css';

const RecipeContext = createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();
    setRecipes(data.meals);
  };

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
      <div className="app-container">
        <h1 className="app-title">Recipe Finder</h1>
        <div className="search-bar-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            placeholder="Search for recipes or ingredients..."
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        <div className="content-container">
          <RecipeList recipes={recipes} />
          <RecipeDetails />
        </div>
      </div>
    </RecipeContext.Provider>
  );
}

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

export default App;