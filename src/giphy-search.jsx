import React from 'react';
import PropTypes from 'prop-types';
import GiphySearchBar from './giphy-search-bar.jsx';
import GiphySearchResults from './giphy-search-results.jsx';

class GiphySearch extends React.Component {
    constructor(props) {
        super(props);
        this.props
        this.state = {  searchTerm: '',
                        loaded: true,
                        error: null,
                        results: []};
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(searchTerm){
      this.setState({searchTerm: searchTerm, loaded: false});
      this.fetchGifs(searchTerm);
    }
    fetchGifs(searchTerm){
        const {apiKey, maxRating, limit, lang} = this.props;
        fetch(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&lang=${lang}&rating=${maxRating}`)
        .then((res) => res.json())
        .then((res) => {
            const results = res.data.map((gif) => gif.images.preview_gif.url); //results will contain urls of all gifs
            this.setState({results, loaded: true})
        })
        .catch((error) => this.setState({error, results:[], loaded: true}));
    }
    render() {
        const {error, results, loaded} = this.state;
        const {autofocus, searchPlaceholder} = this.props;
        let resultsComponent;
        if(error){
            return <div class="giphy-search-error">Error: {this.error}</div>
        }
        if(!loaded){
            resultsComponent = (<div class="giphy-search-loading"><small>Loading...</small></div>);
        }
        else{
            resultsComponent = (<GiphySearchResults results={this.state.results}/>);
        }
        return (
            <div className="giphy-search">
                <GiphySearchBar autofocus={autofocus} placeholder={searchPlaceholder} onHandleSearch={this.handleSearch}/>
                {resultsComponent}
            </div>
        );
    }
};

GiphySearch.defaultProps = {  
    maxRating: 'pg-13',  
    limit: '5',
    lang: 'en',
    autofocus: false,
    searchPlaceholder: null
};

GiphySearch.propTypes = {
    maxRating: PropTypes.string, //- y,g,pg,pg-13,r
    apiKey: PropTypes.string.isRequired, 
    limit: PropTypes.number,
    lang: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    autofocus: PropTypes.bool
};

export default GiphySearch;