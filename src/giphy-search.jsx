import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import GiphySearchBar from './giphy-search-bar';
import GiphySearchResults from './giphy-search-results';

class GiphySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      error: null,
      results: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(searchTerm) {
    this.setState({ loaded: false });
    this.fetchGifs(searchTerm);
  }
  fetchGifs(searchTerm) {
    const {
      apiKey,
      maxRating,
      limit,
      lang,
      https,
    } = this.props;
    const httpPrefix = https ? 'https' : 'http';
    const apiEndpoint = 'api.giphy.com/v1/gifs/search';
    fetch(`${httpPrefix}://${apiEndpoint}?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&lang=${lang}&rating=${maxRating}`)
      .then(res => res.json())
      .then((res) => {
        // results will contain urls of all gifs
        const results = res.data.map(gif => gif.images.preview_gif.url);
        this.setState({ results, loaded: true });
      })
      .catch(error => this.setState({ error, results: [], loaded: true }));
  }
  render() {
    const { error, loaded } = this.state;
    const { autofocus, searchPlaceholder } = this.props;
    let resultsComponent;
    if (error) {
      return <div className="giphy-search-error">Error: {this.error}</div>;
    }
    if (!loaded) {
      resultsComponent = (<div className="giphy-search-loading"><small>Loading...</small></div>);
    } else {
      resultsComponent = (<GiphySearchResults results={this.state.results} />);
    }
    return (
      <div className="giphy-search">
        <GiphySearchBar
          autofocus={autofocus}
          placeholder={searchPlaceholder}
          onHandleSearch={this.handleSearch}
        />
        { resultsComponent }
      </div>
    );
  }
}

GiphySearch.defaultProps = {
  maxRating: 'pg-13',
  limit: '5',
  lang: 'en',
  autofocus: false,
  searchPlaceholder: null,
  https: false,
};

GiphySearch.propTypes = {
  maxRating: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  limit: PropTypes.number,
  lang: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  autofocus: PropTypes.bool,
  https: PropTypes.bool,
};

export default GiphySearch;
