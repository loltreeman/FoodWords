import './App.css';
import Button from './buttons/Button.js';

import { useState } from 'react';
import { cloneElement } from 'react';

var ingredients_list = [
	'Cabbage',
	'Garlic',
	'Apple',
	'Tomato',
	'Water'
	]

var ingredients = []

for (var key = 0; key < ingredients_list.length; key++) {
	ingredients[key] = {name: ingredients_list[key], id: key, display: false}
}

export default function MainApp() {	
	const [count, setCount] = useState(0)
	const [values, setValues] = useState(ingredients)
	const [list, setList] = useState([])
	
	function changeIngredient(steps) {
		let temp_count = count + steps
		
		if (temp_count < 0) {
			setCount(temp_count + ingredients.length)
		} else if (temp_count > ingredients.length - 1) {
			setCount(temp_count - ingredients.length)
		} else {
			setCount(temp_count)
		}
		
		setValues(ingredients)
	}
	
	function changeList(add) {		
		if (!add) {
			let added = list.concat(ingredients[count].name)
			setList(added)
			
			ingredients[count].display = true
		} else {			
			let removed = list.filter(ingredient => ingredient !== ingredients[count].name)
			setList(removed)
			ingredients[count].display = false
		}
		setValues(ingredients)
	}
	
	const display = list.map(ingredient =>
		<div className="div">
		<li> 
			{ ingredient }
		</li>
		</div>
	)
	
	return (
	<>
		<div className="div">
			<h1> Food Words </h1>
			<span className="span">
				<Button text="<" className="button" onClick={() => changeIngredient(-1)}/>
				<span className="a"> { values[count].name } </span>
				<Button text=">" className="button" onClick={() => changeIngredient(1)}/>
			</span> <br/> <br/>
			
			<Button text={values[count].display ? "Remove" : "Add"} className="button" onClick={() => changeList(values[count].display) }/> <br/> <br/>
			
			{list.length > 0 && (<h3> Added Ingredients </h3>)} 
			<ol className="ol">
			{ display }
			</ol>
		</div>
	</>
	);
}