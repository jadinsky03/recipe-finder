import React, { useState, useEffect } from 'react';
import './index.css';
import { ClipLoader } from 'react-spinners';
import RecipeContext from './context/RecipeContext';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setSuggestions(data.meals || []);
          // setShowSuggestions(true);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = async (term) => {
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const data = await response.json();
    setRecipes(data.meals);
    setLoading(false);
  };

  const handleSelectSuggestion = async (suggestion) => {
    setSearchTerm(suggestion.strMeal);
    setSuggestions([]);
    setShowSuggestions(false);
    await handleSearch(suggestion.strMeal);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
      <div className="app-container">
        <h1 className="app-title">Recipe Finder</h1>
        <div className="search-bar-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
            placeholder="Search for recipes or ingredients..."
          />
          <button onClick={() => handleSearch(searchTerm)} className="search-button">Search</button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <div className="autocomplete-container">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.idMeal}
                className="suggestion-item"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion.strMeal}
              </div>
            ))}
          </div>
        )}
        <div className="content-container">
          {loading ? (
            <ClipLoader color="#f56a6a" loading={loading} size={50} />
          ) : (
            <>
              <RecipeList recipes={recipes} />
              <RecipeDetails />
            </>
          )}
        </div>
      </div>
    </RecipeContext.Provider>
  );
}

export default App;