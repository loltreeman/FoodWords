import React, { useState } from 'react';
import './App.css';
import Button from './buttons/Button.js';

export default function MainApp() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [markedIngredients, setMarkedIngredients] = useState([]); 

  const localRecipes = [
    {
      name: "Chicken Adobo",
      ingredients: ["Chicken", "Soy Sauce", "Vinegar", "Garlic", "Bay Leaves", "Peppercorns"],
      youtube: "https://www.youtube.com/watch?v=FWjp0ieChzs"
    },
    {
      name: "Sinigang na Baboy",
      ingredients: ["Pork", "Tamarind", "Radish", "Eggplant", "Okra", "Water Spinach"],
      youtube: "https://www.youtube.com/watch?v=kIoY0li1ABk&list=PLe2Zq7EovWR0_bfLXbDp_TIynlUaDnV2p"
    },
    {
      name: "Lechon Kawali",
      ingredients: ["Pork Belly", "Salt", "Pepper", "Garlic", "Bay Leaves"],
      youtube: "https://www.youtube.com/watch?v=Df8uYWP5hEU"
    }
  ];

  const recipes = localRecipes;

  function addIngredient() {
    if (newIngredient.trim()) {
      if (!ingredientsList.find(ing => ing.toLowerCase() === newIngredient.trim().toLowerCase())) {
        setIngredientsList(prev => [...prev, newIngredient.trim()]);
      }
      setNewIngredient('');
    }
  }

  function removeIngredient(ingredient) {
    if (window.confirm(`Remove "${ingredient}" from your list?`)) {
      setIngredientsList(prev => prev.filter(ing => ing !== ingredient));
      setMarkedIngredients(prev => prev.filter(ing => ing !== ingredient)); 
    }
  }

  function generateRecipes() {
    const threshold = 3;
    return recipes
      .map(recipe => {
        const missing = recipe.ingredients.filter(req =>
          !ingredientsList.find(userIng => userIng.toLowerCase() === req.toLowerCase())
        );
        return { ...recipe, missing };
      })
      .filter(recipe => recipe.missing.length <= threshold);
  }

  return (
    <div className="div">
      <h2>FoodWords</h2>

      <div className="div_">
        <input 
          type="text" 
          placeholder="Ingredient name"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addIngredient();
            }
          }}
        />
        <Button text="Add Ingredient" onClick={addIngredient} />
      </div>
      <br />

      {ingredientsList.length > 0 && (
        <div className="div_">
          <h3>Your Ingredients</h3>
          <ol className="ol">
            {ingredientsList.map((ing, i) => (
              <li 
                key={i} 
                onClick={() => removeIngredient(ing)} 
                style={{ 
                  cursor: "pointer", 
                  color: markedIngredients.includes(ing) ? "red" : "black" 
                }}
              >
                {ing}
              </li>
            ))}
          </ol>
        </div>
      )}
      
      <hr />

      <div>
        <h3>Possible Recipes</h3>
        {generateRecipes().length === 0 ? (
          <p>No matching recipes. Try adding more ingredients!</p>
        ) : (
          <div className="recipes-container">
            {generateRecipes().map((recipe, i) => (
              <div
                key={i}
                className="card"
                style={{ "--rating": 100 - recipe.missing.length * 20 }}
              >
                <div className="icon">🍽️</div>
                <div className="title">{recipe.name}</div>
                <p className="description">
                  {recipe.missing.length > 0
                    ? <>Missing: {recipe.missing.join(', ')}</>
                    : "All ingredients available!"}
                </p>
                <div className="rating"></div>
                {recipe.youtube && (
                  <a
                    href={recipe.youtube}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See the recipe
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
