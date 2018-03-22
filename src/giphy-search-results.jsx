import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

const GiphySearchResults = (props) => {
  const { results } = props;
  if (results) {
    return (
      <div className="react-giphy-search-img-container">
        {results.map(gifURL =>
          // eslint-disable-next-line
          <img key={gifURL} src={gifURL} className="react-giphy-search-img" />)}
      </div>);
  }
  return null;
};

GiphySearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GiphySearchResults;
