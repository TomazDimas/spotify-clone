import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  render() {
    const { onSearchInputChange,
      searchArtistInput,
      isSearchButtonDisabled,
      onClickSearch,
      loadingSearch,
      isSearchLoaded,
      searchedObjectArray,
      lastSearch,
      isAlbumEmpty,
    } = this.props;

    return (
      <div data-testid="page-search">
        <Header />
        { loadingSearch ? <Loading /> : (

          <form className="searchForm">
            <input
              name="searchArtistInput"
              type="text"
              value={ searchArtistInput }
              onChange={ onSearchInputChange }
              data-testid="search-artist-input"
            />
            <button
              type="button"
              disabled={ isSearchButtonDisabled }
              onClick={ onClickSearch }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        ) }
        <div className="albumsList">
          <h1>
            {'Resultado de álbuns de: '}
            <br />
            { lastSearch }
          </h1>
          { isAlbumEmpty && <h1>Nenhum álbum foi encontrado</h1> }
          { isSearchLoaded && searchedObjectArray.map((album) => {
            const { artistName, collectionId, collectionName, artworkUrl100 } = album;
            return (
              <div key={ collectionId }>
                <div className="albumContainer">
                  <h1>{ collectionName }</h1>
                  <h2>{ artistName }</h2>
                  <img alt={ collectionName } src={ artworkUrl100 } />
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    Ver Álbum
                  </Link>
                </div>
              </div>
            );
          }) }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onSearchInputChange: PropTypes.func,
  searchArtistInput: PropTypes.string,
  isSearchButtonDisabled: PropTypes.bool,
  onClickSearch: PropTypes.func,
  loadingSearch: PropTypes.bool,
  isSearchLoaded: PropTypes.bool,
  searchedObjectArray: PropTypes.arrayOf(PropTypes.object),
  lastSearch: PropTypes.string,
  isAlbumEmpty: PropTypes.bool,
};

Search.defaultProps = {
  onSearchInputChange: '',
  searchArtistInput: '',
  isSearchButtonDisabled: true,
  onClickSearch: '',
  loadingSearch: false,
  isSearchLoaded: false,
  searchedObjectArray: [],
  lastSearch: '',
  isAlbumEmpty: false,
};

export default Search;
