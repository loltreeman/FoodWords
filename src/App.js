import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function MainApp() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
    },
    {
      name: "Kare-Kare",
      ingredients: ["Oxtail", "Peanut Butter", "Eggplant", "Bitter Melon", "Banana Flower", "Shrimp Paste"],
      youtube: "https://www.youtube.com/watch?v=YvTs4on5aVM"
    },
    {
      name: "Pancit Canton",
      ingredients: ["Egg Noodles", "Chicken", "Shrimp", "Cabbage", "Carrot", "Soy Sauce"],
      youtube: "https://www.youtube.com/watch?v=7oUYagLDNx0"
    },
    {
      name: "Apple Pie",
      ingredients: ["Apple", "Flour", "Sugar", "Butter", "Cinnamon"],
      youtube: "https://www.youtube.com/watch?v=UIimSEqeN8s"
    },
    {
      name: "Tomato Soup",
      ingredients: ["Tomato", "Garlic", "Basil", "Water", "Salt"],
      youtube: "https://www.youtube.com/watch?v=szjZ3vqwyXE"
    },
    {
      name: "Cheeseburger",
      ingredients: ["Beef Patty", "Bun", "Cheddar Cheese", "Lettuce", "Tomato", "Pickles", "Onion", "Ketchup"],
      youtube: "https://www.youtube.com/watch?v=nq9WnmCGoFQ"
    },
    {
      name: "Mac and Cheese",
      ingredients: ["Macaroni", "Cheese", "Milk", "Butter", "Flour", "Breadcrumbs"],
      youtube: "https://www.youtube.com/watch?v=FUeyrEN14Rk"
    }
  ];

  const recipes = localRecipes;

  const addIngredient = () => {
    if (newIngredient.trim()) {
      if (!ingredientsList.find(ing => ing.toLowerCase() === newIngredient.trim().toLowerCase())) {
        setIngredientsList(prev => [...prev, newIngredient.trim()]);
      }
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient) => {
    if (window.confirm(`Remove "${ingredient}" from your list?`)) {
      setIngredientsList(prev => prev.filter(ing => ing !== ingredient));
    }
  };

  const generateRecipes = () => {
    const threshold = 3;
    return recipes
      .map(recipe => {
        const missing = recipe.ingredients.filter(req =>
          !ingredientsList.find(userIng => userIng.toLowerCase() === req.toLowerCase())
        );
        return { ...recipe, missing };
      })
      .filter(recipe => recipe.missing.length <= threshold);
  };

  const openRecipeModal = (recipe) => setSelectedRecipe(recipe);
  const closeRecipeModal = () => setSelectedRecipe(null);

  return (
    <div className="container my-4 ratatouille-theme">
      <div className="logo text-center mb-4">
        <div className="chef-hat"></div>
        <div className="oval">
          <h1 className="logo-text">FoodWords</h1>
          <p className="logo-tagline">Turn words into a feast!</p>
          <div className="whiskers">
            <span className="whisker left"></span>
            <div className="nose"></div>
            <span className="whisker right"></span>
          </div>
        </div>
      </div>

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
                style={{ "--rating": 100 - recipe.missing.length * 20, "--amount": recipe.ingredients.length}}
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

      <h2 className="mb-3 text-center">Possible Recipes</h2>
      <div className="row g-3">
        {generateRecipes().length === 0 ? (
          <p className="text-center">No matching recipes. Try adding more ingredients!</p>
        ) : (
          generateRecipes().map((recipe, i) => (
            <div key={i} className="col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm recipe-card" onClick={() => openRecipeModal(recipe)} style={{ cursor: 'pointer' }}>
                <div className="card-img-top placeholder-img"></div>
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    {recipe.missing.length > 0
                      ? `Missing: ${recipe.missing.join(', ')}`
                      : 'All ingredients available!'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={closeRecipeModal}>
          <div className="modal-dialog modal-dialog-centered" role="document" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header ratatouille-modal-header">
                <h5 className="modal-title">{selectedRecipe.name}</h5>
                <button type="button" className="btn-close" onClick={closeRecipeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Ingredients:</strong></p>
                <div className="d-flex flex-wrap gap-2">
                  {selectedRecipe.ingredients.map((ingredient, i) => {
                    const hasIngredient = ingredientsList.some(
                      ing => ing.toLowerCase() === ingredient.toLowerCase()
                    );
                    return (
                      <span key={i} className={`badge ${hasIngredient ? 'bg-primary' : 'bg-light text-dark'} ingredient-badge`}>
                        {ingredient}
                      </span>
                    );
                  })}
                </div>
                <hr />
                <p>
                  Watch the full recipe tutorial{' '}
                  <a href={selectedRecipe.youtube} target="_blank" rel="noopener noreferrer">
                    here
                  </a>.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeRecipeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>                
      )}
    </div>
  );
}