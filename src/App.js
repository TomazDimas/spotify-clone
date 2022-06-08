import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    loginNameInput: '',
    isButtonDisabled: true,
    loadingLogin: false,
    isLoginLoaded: false,
    searchArtistInput: '',
    isSearchButtonDisabled: true,
    loadingSearch: false,
    isSearchLoaded: false,
    searchedObjectArray: [],
    lastSearch: '',
    isAlbumEmpty: false,
  }

  // SEARCH FUNCS
  onClickSearch = async () => {
    const { searchArtistInput } = this.state;
    const searchedArtist = searchArtistInput;

    this.setState({
      lastSearch: searchedArtist,
      searchArtistInput: '',
      loadingSearch: true,
    }, async () => {
      console.log(searchedArtist);
      console.log(searchArtistInput);
      const albumObjectArray = await searchAlbumsAPI(searchedArtist);
      console.log(albumObjectArray);
      this.setState({
        searchedObjectArray: albumObjectArray,
        loadingSearch: false,
        isSearchLoaded: true,
        isAlbumEmpty: albumObjectArray.length === 0,
      });
    });
  }

  searchInputCheck = () => {
    const { searchArtistInput } = this.state;
    const minNameLength = 2;

    if (searchArtistInput.length < minNameLength) {
      this.setState({
        isSearchButtonDisabled: true,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: false,
      });
    }
  }

  onSearchInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({
      [name]: value,
    }), this.searchInputCheck);
  }

  // LOGIN FUNCS
  inputCheck = () => {
    const { loginNameInput } = this.state;
    const minNameLength = 3;

    if (loginNameInput.length < minNameLength) {
      this.setState({
        isButtonDisabled: true,
      });
    } else {
      this.setState({
        isButtonDisabled: false,
      });
    }
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({
      [name]: value,
    }), this.inputCheck);
  }

  onCreateUserClick = async () => {
    const { loginNameInput } = this.state;
    this.setState(
      { loadingLogin: true },
      async () => {
        await createUser({ name: loginNameInput });
        this.setState({
          loadingLogin: false,
          isLoginLoaded: true,
        });
      },
    );
  }

  render() {
    const {
      isButtonDisabled,
      loadingLogin,
      isLoginLoaded,
      searchArtistInput,
      isSearchButtonDisabled,
      loadingSearch,
      isSearchLoaded,
      searchedObjectArray,
      lastSearch,
      isAlbumEmpty,
    } = this.state;

    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route
            path="/search"
            render={ () => (<Search
              onSearchInputChange={ this.onSearchInputChange }
              onClickSearch={ this.onClickSearch }
              searchArtistInput={ searchArtistInput }
              isSearchButtonDisabled={ isSearchButtonDisabled }
              loadingSearch={ loadingSearch }
              isSearchLoaded={ isSearchLoaded }
              searchedObjectArray={ searchedObjectArray }
              lastSearch={ lastSearch }
              isAlbumEmpty={ isAlbumEmpty }
            />) }
          />
          <Route
            exact
            path="/"
            render={ () => (<Login
              isButtonDisabled={ isButtonDisabled }
              onInputChange={ this.onInputChange }
              onCreateUserClick={ this.onCreateUserClick }
              loadingLogin={ loadingLogin }
              isLoginLoaded={ isLoginLoaded }
            />) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
