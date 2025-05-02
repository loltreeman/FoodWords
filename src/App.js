import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function MainApp() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  const printRecipe = () => {
    if (!selectedRecipe) return;

    const printWindow = window.open('', '_blank');
    const hasIngredient = (ing) =>
      ingredientsList.some(item => item.toLowerCase() === ing.toLowerCase());

    const content = `
      <html>
      <head>
        <title>${selectedRecipe.name} - Print View</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          ul { list-style: none; padding: 0; }
          li { padding: 5px; }
          .owned { color: green; font-weight: bold; }
          .missing { color: red; }
          a { color: #1a0dab; text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>${selectedRecipe.name}</h1>
        <h3>Ingredients:</h3>
        <ul>
          ${selectedRecipe.ingredients.map(ing =>
            `<li class="${hasIngredient(ing) ? 'owned' : 'missing'}">${ing}</li>`
          ).join('')}
        </ul>
        <p><strong>Watch the recipe:</strong> <a href="${selectedRecipe.youtube}" target="_blank">${selectedRecipe.youtube}</a></p>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
  };


  const localRecipes = useMemo(() => [
    {
      name: "Chicken Adobo",
      ingredients: ["Chicken", "Soy Sauce", "Vinegar", "Garlic", "Bay Leaf", "Peppercorn"],
      youtube: "https://www.youtube.com/watch?v=FWjp0ieChzs",
    },
    {
      name: "Sinigang na Baboy",
      ingredients: ["Pork", "Tamarind", "Radish", "Eggplant", "Okra", "Water Spinach"],
      youtube: "https://www.youtube.com/watch?v=kIoY0li1ABk&list=PLe2Zq7EovWR0_bfLXbDp_TIynlUaDnV2p",
    },
    {
      name: "Lechon Kawali",
      ingredients: ["Pork Belly", "Salt", "Pepper", "Garlic", "Bay Leaf"],
      youtube: "https://www.youtube.com/watch?v=Df8uYWP5hEU",
    },
    {
      name: "Kare-Kare",
      ingredients: ["Oxtail", "Peanut Butter", "Eggplant", "Bitter Melon", "Banana Flower", "Shrimp Paste"],
      youtube: "https://www.youtube.com/watch?v=YvTs4on5aVM",
    },
    {
      name: "Pancit Canton",
      ingredients: ["Egg Noodle", "Chicken", "Shrimp", "Cabbage", "Carrot", "Soy Sauce"],
      youtube: "https://www.youtube.com/watch?v=7oUYagLDNx0",
    },
    {
      name: "Apple Pie",
      ingredients: ["Apple", "Flour", "Sugar", "Butter", "Cinnamon"],
      youtube: "https://www.youtube.com/watch?v=UIimSEqeN8s",
    },
    {
      name: "Tomato Soup",
      ingredients: ["Tomato", "Garlic", "Basil", "Water", "Salt"],
      youtube: "https://www.youtube.com/watch?v=szjZ3vqwyXE",
    },
    {
      name: "Cheeseburger",
      ingredients: ["Beef Patty", "Bun", "Cheddar Cheese", "Lettuce", "Tomato", "Pickle", "Onion", "Ketchup"],
      youtube: "https://www.youtube.com/watch?v=nq9WnmCGoFQ",
    },
    {
      name: "Sweet Madame Rose Roasted Chicken",
      ingredients: ["Whole Chicken", "Salt", "Pepper", "Lemon", "Fresh Thyme", "Water", "Lemon Juice", "Soy Sauce", "Honey", "Brown Sugar", "Butter", "Frozen Pea"],
      youtube: "https://youtu.be/fmsqIvMkPVo?si=X0fw2uU764kFjVXC",
    },
    {
      name: "Undertale Butterscotch-Cinnamon Pie",
      ingredients: [
        "Flour", "Butter", "Shortening", "Buttermilk", "Sugar", "Salt", "Vanilla Bean",
        "Brown Sugar", "Butterscotch Chip", "Egg Yolk", "Salted Butter", "Ground Cinnamon",
        "Cornstarch", "Heavy Cream", "Milk", "Dried Bean", "Egg White"
      ],
      youtube: "https://youtu.be/64M8UTnmv3g?si=m5YZyu_2laSPRV9M",
    },
    {
      name: "Sticky Honey Roast",
      ingredients: ["Salt", "Pepper", "Smoked Paprika", "Cayenne Pepper", "Pork Shoulder Roast", "Honey", "Maple Syrup", "Brown Sugar", "Soy Sauce", "Water", "Jumbo Carrot", "Flour", "Red Wine Reduction", "Butter"],
      youtube: "https://youtu.be/bWXFi9alqdo?si=W4TZCFOKJ1CwZ_WL",
    },
    {
      name: "Freddy Fazbear's Pepperoni Express",
      ingredients: ["Water", "Dried Yeast", "Sugar", "Unbleached Bread Flour", "Fine Semolina", "Salt", "Olive Oil", "Mozzarella Cheese", "Pepperoni Slice", "Caper", "Fresh Arugula Leaf"],
      youtube: "https://www.youtube.com/watch?v=yaefcMo6kGE&list=PLRjqpUPhaHlaTUdBHTeZUD8di8S-c4xfw&index=6",
    },
    {
      name: "Chica's Ultimate Thai Chicken Burger",
      ingredients: [
        "Cabbage", "Carrot", "Onion", "Red Chili", "Lime", "Honey", "Garlic", "Rice Wine Vinegar", "Soy Sauce", "Cilantro",
        "Chicken Breast", "Egg", "Scallion", "Red Thai Curry Paste", "Fish Sauce", "Breadcrumb", "Vegetable Oil",
        "Mayo", "Thai Sweet Chili Sauce", "Bun"
      ],
      youtube: "https://www.youtube.com/watch?v=yaefcMo6kGE&list=PLRjqpUPhaHlaTUdBHTeZUD8di8S-c4xfw&index=6",
    },
    {
      name: "Jade Parcels",
      ingredients: [
        "Cabbage", "Ham", "Jun Chili", "Lotus Root", "Ground Pork", "Vegetable Oil", "Ginger", "Garlic",
        "Salt", "Scallion", "Oyster Sauce", "Soy Sauce", "Bay Leaf", "Star Anise", "Dried Chili Pepper",
        "Spicy Bean Paste", "Vegetable Broth", "Green Onion"
      ],
      youtube: "https://youtu.be/jFxQMnFi3E4?si=8u-NFoEGjA5IpCUR",
    },
    {
      name: "Minecraft Golden Apples",
      ingredients: [
        "Apple", "Vanilla Extract", "Honey", "Purple Laffy Taffy", "Purple Sprinkle", "Brown Sugar",
        "Green Gummy Candy", "Egg White", "Purple Food Coloring", "Tootsie Roll", "Cream Cheese"
      ],
      youtube: "https://youtu.be/ZgKhCWJNL38?si=M511Rs3MRAzC2o55",
    },
  ], []);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipeName = params.get('recipe');
    if (recipeName) {
      const found = localRecipes.find(r => r.name === recipeName);
      if (found) openRecipeModal(found);
    }
  }, [localRecipes]); 


  const addIngredient = () => {
    if (newIngredient.trim()) {
      const ing = newIngredient.trim();
      if (!ingredientsList.some(item => item.toLowerCase() === ing.toLowerCase())) {
        setIngredientsList(prev => [...prev, ing]);
      }
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient) => {
    if (window.confirm(`Remove "${ingredient}" from your list?`)) {
      setIngredientsList(prev => prev.filter(ing => ing !== ingredient));
    }
  };

  const clearAllIngredients = () => {
    if (window.confirm('Remove all ingredients from your list?')) {
      setIngredientsList([]);
    }
  };

  const toggleFavorite = (name) => {
    setFavorites(prev =>
      prev.includes(name)
        ? prev.filter(f => f !== name)
        : [...prev, name]
    );
  };

  const generateRecipes = () => {
    const threshold = 4;
    let list = localRecipes
      .map(recipe => {
        const missing = recipe.ingredients.filter(req =>
          !ingredientsList.some(userIng => userIng.toLowerCase() === req.toLowerCase())
        );
        return { ...recipe, missing };
      })
      .filter(recipe => recipe.missing.length <= threshold)
      .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
    list.sort((a, b) => sortAsc ? a.missing.length - b.missing.length : b.missing.length - a.missing.length);
    return list;
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    const params = new URLSearchParams(window.location.search);
    params.set('recipe', recipe.name);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    const params = new URLSearchParams(window.location.search);
    params.delete('recipe');
    window.history.replaceState(null, '', params.toString() ? `?${params.toString()}` : window.location.pathname);
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  };

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

      <div className="card p-4 mb-4 shadow-sm hero-card">
        <p className="text-center text-muted">Your digital companion for your culinary inspirations!</p>
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add an ingredient"
            value={newIngredient}
            onChange={e => setNewIngredient(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addIngredient()}
          />
          <button className="btn btn-primary" onClick={addIngredient}>Add Ingredient</button>
        </div>
        {ingredientsList.length > 0 && (
          <>
            <div className="d-flex justify-content-end mb-2">
              <button className="btn btn-outline-danger btn-sm" onClick={clearAllIngredients}>
                Clear All
              </button>
            </div>
            <div className="text-center">
              <h5>Your Ingredients</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {ingredientsList.map((ing, idx) => (
                  <span
                    key={idx}
                    className="badge bg-secondary ingredient-badge"
                    onClick={() => removeIngredient(ing)}
                    style={{ cursor: 'pointer' }}
                  >{ing}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <h2 className="mb-3 text-center">Possible Recipes</h2>

<div className="row mb-3">
  <div className="col-md-8 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="Search recipes"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  </div>
  <div className="col-md-4">
    <label htmlFor="sortOrder" className="form-label">Sort by missing ingredients:</label>
    <select
      id="sortOrder"
      className="form-select"
      value={sortAsc ? 'asc' : 'desc'}
      onChange={e => setSortAsc(e.target.value === 'asc')}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
      </div>
      <div className="row g-3">
        {generateRecipes().length === 0 ? (
          <p className="text-center">No matching recipes. Try adding more ingredients or adjusting your search!</p>
        ) : (
          generateRecipes().map((recipe, i) => (
            <div key={i} className="col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm recipe-card" style={{ position: 'relative', cursor: 'pointer' }}>
                <span
                  onClick={e => { e.stopPropagation(); toggleFavorite(recipe.name); }}
                  style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  {favorites.includes(recipe.name) ? '★' : '☆'}
                </span>
                <div className="card-img-top placeholder-img" onClick={() => openRecipeModal(recipe)}></div>
                <div className="card-body" onClick={() => openRecipeModal(recipe)}>
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    {recipe.missing.length ? `Missing: ${recipe.missing.join(', ')}` : 'All ingredients available!'}
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
          <button className="btn btn-sm btn-outline-primary mb-3" onClick={shareLink}>
            Share Recipe
          </button>
          <button className="btn btn-sm btn-outline-secondary mb-3 ms-2" onClick={printRecipe}>
            Print Recipe
          </button>
          <p><strong>Ingredients:</strong></p>
          <div className="d-flex flex-wrap gap-2">
            {selectedRecipe.ingredients.map((ing, i) => {
              const has = ingredientsList.some(item => item.toLowerCase() === ing.toLowerCase());
              return <span key={i} className={`badge ${has ? 'bg-primary' : 'bg-light text-dark'} ingredient-badge`}>{ing}</span>;
            })}
          </div>
          <hr />
          <p>Watch the full recipe tutorial:</p>
          {selectedRecipe.youtube && (
            <div className="d-flex justify-content-center mb-3">
              <iframe
                className="embed-responsive-item"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedRecipe.youtube)}`}
                allowFullScreen
                title={selectedRecipe.name}
                style={{ width: '100%', height: '200px', maxWidth: '800px' }} 
              />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeRecipeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}
  </div>
  );
}
