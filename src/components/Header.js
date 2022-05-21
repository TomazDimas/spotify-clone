import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    isHeaderLoading: false,
  }

  saveNameInHeaderState = async () => {
    this.setState({
      isHeaderLoading: true,
    },
    async () => {
      const userObject = await getUser();
      const userName = userObject.name;
      this.setState({
        userName,
        isHeaderLoading: false,
      });
    });
  }

  componentDidMount = () => {
    this.saveNameInHeaderState();
  }

  render() {
    const { userName, isHeaderLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isHeaderLoading ? <Loading /> : (
          <div>
            <h1>TrybeTunes Header</h1>
            <h2 data-testid="header-user-name">{ userName }</h2>
            <nav>
              <Link to="/search" data-testid="link-to-search">Procurar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </nav>
          </div>
        ) }
      </header>
    );
  }
}

export default Header;
