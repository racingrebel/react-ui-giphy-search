'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _giphySearchBar = require('./giphy-search-bar.jsx');

var _giphySearchBar2 = _interopRequireDefault(_giphySearchBar);

var _giphySearchResults = require('./giphy-search-results.jsx');

var _giphySearchResults2 = _interopRequireDefault(_giphySearchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GiphySearch = function (_React$Component) {
    _inherits(GiphySearch, _React$Component);

    function GiphySearch(props) {
        _classCallCheck(this, GiphySearch);

        var _this = _possibleConstructorReturn(this, (GiphySearch.__proto__ || Object.getPrototypeOf(GiphySearch)).call(this, props));

        _this.props;
        _this.state = { searchTerm: '',
            loaded: true,
            error: null,
            results: [] };
        _this.handleSearch = _this.handleSearch.bind(_this);
        return _this;
    }

    _createClass(GiphySearch, [{
        key: 'handleSearch',
        value: function handleSearch(searchTerm) {
            this.setState({ searchTerm: searchTerm, loaded: false });
            this.fetchGifs(searchTerm);
        }
    }, {
        key: 'fetchGifs',
        value: function fetchGifs(searchTerm) {
            var _this2 = this;

            var _props = this.props,
                apiKey = _props.apiKey,
                maxRating = _props.maxRating,
                limit = _props.limit,
                lang = _props.lang,
                https = _props.https;

            var httpPrefix = https ? 'https' : 'http';
            var apiEndpoint = 'api.giphy.com/v1/gifs/search';
            fetch(httpPrefix + '://' + apiEndpoint + '?q=' + searchTerm + '&api_key=' + apiKey + '&limit=' + limit + '&lang=' + lang + '&rating=' + maxRating).then(function (res) {
                return res.json();
            }).then(function (res) {
                var results = res.data.map(function (gif) {
                    return gif.images.preview_gif.url;
                }); //results will contain urls of all gifs
                _this2.setState({ results: results, loaded: true });
            }).catch(function (error) {
                return _this2.setState({ error: error, results: [], loaded: true });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                error = _state.error,
                results = _state.results,
                loaded = _state.loaded;
            var _props2 = this.props,
                autofocus = _props2.autofocus,
                searchPlaceholder = _props2.searchPlaceholder;

            var resultsComponent = void 0;
            if (error) {
                return _react2.default.createElement(
                    'div',
                    { 'class': 'giphy-search-error' },
                    'Error: ',
                    this.error
                );
            }
            if (!loaded) {
                resultsComponent = _react2.default.createElement(
                    'div',
                    { 'class': 'giphy-search-loading' },
                    _react2.default.createElement(
                        'small',
                        null,
                        'Loading...'
                    )
                );
            } else {
                resultsComponent = _react2.default.createElement(_giphySearchResults2.default, { results: this.state.results });
            }
            return _react2.default.createElement(
                'div',
                { className: 'giphy-search' },
                _react2.default.createElement(_giphySearchBar2.default, { autofocus: autofocus, placeholder: searchPlaceholder, onHandleSearch: this.handleSearch }),
                resultsComponent
            );
        }
    }]);

    return GiphySearch;
}(_react2.default.Component);

;

GiphySearch.defaultProps = {
    maxRating: 'pg-13',
    limit: '5',
    lang: 'en',
    autofocus: false,
    searchPlaceholder: null,
    https: false
};

GiphySearch.propTypes = {
    maxRating: _propTypes2.default.string, //- y,g,pg,pg-13,r
    apiKey: _propTypes2.default.string.isRequired,
    limit: _propTypes2.default.number,
    lang: _propTypes2.default.string,
    searchPlaceholder: _propTypes2.default.string,
    autofocus: _propTypes2.default.bool,
    https: _propTypes2.default.bool
};

exports.default = GiphySearch;
