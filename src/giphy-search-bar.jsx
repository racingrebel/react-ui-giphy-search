import React from 'react';
import PropTypes from 'prop-types';

class GiphySearchBar extends React.Component {
   constructor(props) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
   }

   handleSearch(e){
      this.props.onHandleSearch(e.target.value);
   }

   render() {
      const {autofocus,placeholder} = this.props;
      return (
         <form className='react-giphy-search-form'>
            <input autofocus={autofocus} placeholder={placeholder} type="text" onChange={this.handleSearch} className='react-giphy-search-input'/>
         </form>
      );
   }
}

GiphySearchBar.propTypes = {
    placeholder: PropTypes.string,
    autofocus: PropTypes.bool
};

export default GiphySearchBar;