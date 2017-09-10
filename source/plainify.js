'use strict';

const plainify = function(nested) {
	return Object.keys(nested).reduce(function(totalPath, key) {
	  	if (typeof(nested[key]) === 'object') {
			let nextPartOfThePath = plainify(nested[key]);
			Object.keys(nextPartOfThePath).forEach(function(anotherKey) {
				totalPath[key + '.' + anotherKey] = nextPartOfThePath[anotherKey];
			});
	    }
	    else {
	    	totalPath[key] = nested[key];
	    }

	    return totalPath;
	}, {});
}
