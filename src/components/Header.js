import React from 'react';
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
            <h2 data-testid="header-user-name">
              Olá
              { userName }
            </h2>
          </div>
        ) }
      </header>
    );
  }
}

export default Header;
