import React, { useState } from 'react';
import './App.css';
import Button from './buttons/Button.js';

const ingredients = [
  'Cabbage',
  'Garlic',
  'Apple',
  'Tomato',
  'Water'
];

export default function MainApp() {
  const [selectedIngredient, setSelectedIngredient] = useState(ingredients[0]);
  const [list, setList] = useState([]);

  // This will update the selected ingredient from the dropdown
  function handleSelectChange(event) {
    setSelectedIngredient(event.target.value);
  }

  // This will add or remove the selected ingredient from the list
  function changeList(added) {
    let newList;
    if (!added) {
      newList = list.concat(selectedIngredient);
    } else {
      newList = list.filter(ingredient => ingredient !== selectedIngredient);
    }
    setList(newList);
  }

  const inList = list.includes(selectedIngredient);

  return (
    <div className="div">
      <h2>Food Words</h2>
      <div className="div_">
        <select value={selectedIngredient} onChange={handleSelectChange}>
          {ingredients.map((ingredient, index) => (
            <option key={index} value={ingredient}>
              {ingredient}
            </option>
          ))}
        </select>
        <br /><br />
      </div>

      <Button
        text={inList ? "Remove" : "Add"}
        className="button"
        onClick={() => changeList(inList)}
      />
      <br /><br />

      {list.length > 0 && <h3>Added Ingredients</h3>}
      <ol className="ol">
        {list.map((ingredient, i) => (
          <div key={i} className="div_">
            <li>{ingredient}</li>
          </div>
        ))}
      </ol>
    </div>
  );
}
