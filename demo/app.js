import React from 'react';
import ReactDOM from 'react-dom';
import ReactGiphySearch from '../dist/react-ui-giphy-search.min.js';

ReactDOM.render(
	<ReactGiphySearch 
		apiKey="KBBe6uhUNdEe23sDbMXJ2fhlGLE7xqXA" 
		maxRating="pg" 
		limit="3" 
		searchPlaceholder="Search..." 
		autofocus="true"/>, 
	document.getElementById('demo-contents'));