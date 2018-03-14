

# React-UI-Giphy-Search

A react component that you can use to search GIPHY for GIFs!

## Newest Features
* 0.1.6 - Added HTTPS support.

## Overview

Creates a search box and a search results box.
Uses the GIPHY API, using their search endpoint.

## Installation

```npm install react-ui-giphy-search```

## Usage

```javascript
import ReactGiphySearch from 'react-ui-giphy-search';

<ReactGiphySearch 
	apiKey="YOUR_APIKEY" //REQUIRED
	/>
```

## Optional Properties

```javascript
//property: default
maxRating: 'pg-13', // MPAA-style rating. Examples include Y, G, PG, PG-13 and R.
limit: '5',			// Number of results the search should return.
lang: 'en',			// Language, 2-letter ISO 639-1 language code.
autofocus: false,	// Should the search input box receive focus upon page load?
searchPlaceholder: null, // Placeholder text for the search box.
https: false		// Should the API call use https?
```

## Further Development

Use ```npm run-script build``` to rebuild the package.
Use ```npm run-script dev-server``` to run the demo.
