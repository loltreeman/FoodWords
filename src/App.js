import './App.css';
import Button from './buttons/Button.js';

import { useState } from 'react';

var ingredients = [
	'Cabbage',
	'Garlic',
	'Apple',
	'Tomato',
	'Water'
	]

export default function MainApp() {	
	const [count, setCount] = useState(0)
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
	}
	
	function changeList(added) {	
		let newList;
		if (!added) { // checks if ingredient has been added, if so, remove it, if not, add it.
			newList = list.concat(ingredients[count])
		} else {			
			newList =  list.filter(ingredient => ingredient !== ingredients[count])
		}
		setList(newList)
	}
	
	const display = list.map(ingredient =>
		<div className="div_">
		<li> 
			{ ingredient }
		</li>
		</div>
	)
	
	let in_list = list.filter(ingredient => ingredients[count] == ingredient).length == 1
	
	return (
	<>	
		<div className="div">
		
			<h2> Food Words </h2>
			
			<div className="div_">
				<span className="container">
					<Button text="<" className="button" onClick={() => changeIngredient(-1)}/>
					<span className="container"> { ingredients[count] } </span>
					<Button text=">" className="button" onClick={() => changeIngredient(1)}/>
				</span>
				<br/> <br/>
			</div>
			
			<Button text={ in_list ? "Remove" : "Add"} className="button" onClick={() => changeList(in_list) }/>
			<br/> <br/>
			
			{list.length > 0 && (<h3> Added Ingredients </h3>)} 
			
			<ol className="ol">
			{ display }
			</ol>
			
		</div>
	</>
	);
}
