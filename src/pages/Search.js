import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    const { onSearchInputChange, searchArtistInput, isSearchButtonDisabled } = this.props;

    return (
      <div data-testid="page-search">
        <Header />
        <form className="searchForm">
          <input
            name="searchArtistInput"
            type="text"
            onChange={ onSearchInputChange }
            value={ searchArtistInput }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ isSearchButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onSearchInputChange: PropTypes.func,
  searchArtistInput: PropTypes.string,
  isSearchButtonDisabled: PropTypes.bool,
};

Search.defaultProps = {
  onSearchInputChange: '',
  searchArtistInput: '',
  isSearchButtonDisabled: true,
};

export default Search;
