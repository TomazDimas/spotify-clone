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

class App extends React.Component {
  state = {
    loginNameInput: '',
    isButtonDisabled: true,
    loadingLogin: false,
    isLoginLoaded: false,
  }

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
    } = this.state;

    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/search" component={ Search } />
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
