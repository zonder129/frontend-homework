'use strict';

const plainify = (nested, path = '') => {
	let allPathsToValues = {}
	for(let key in nested){
		let dot = (path !== '')? '.' : '';
		if (typeof(nested[key]) == 'object'){
			let nextPartOfThePath = plainify(nested[key], path + dot + key);

			for (let nextPath in nextPartOfThePath) {
				allPathsToValues[nextPath] = nextPartOfThePath[nextPath];
			}
		}
		else {
			allPathsToValues[path + dot + key] = nested[key]
		}
	}
	return allPathsToValues; 
}