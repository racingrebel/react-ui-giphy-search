import React from 'react';
import PropTypes from 'prop-types';

class GiphySearchResults extends React.Component {
   constructor(props) {
      super(props);
   }
   render() {
      const results = this.props.results;
      if(results){
         return (
            <div className='react-giphy-search-img-container'>
               {results.map((gifURL) => (
                  <img key={gifURL} src={gifURL} className='react-giphy-search-img'></img>
               ))}
         </div>
         );
      }
      else{
         return null
      }

   }
}

GiphySearchResults.propTypes = {
    results: PropTypes.array
};

export default GiphySearchResults;