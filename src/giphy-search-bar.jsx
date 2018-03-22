import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

class GiphySearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.props.onHandleSearch(e.target.value);
  }

  render() {
    const { autofocus, placeholder } = this.props;
    return (
      <form className="react-giphy-search-form">
        <input
          autoFocus={autofocus} // eslint-disable-line
          placeholder={placeholder}
          type="text"
          onChange={this.handleSearch}
          className="react-giphy-search-input"
        />
      </form>
    );
  }
}

GiphySearchBar.defaultProps = {
  placeholder: '',
  autofocus: false,
};

GiphySearchBar.propTypes = {
  placeholder: PropTypes.string,
  autofocus: PropTypes.bool,
  onHandleSearch: PropTypes.func.isRequired,
};

export default GiphySearchBar;
