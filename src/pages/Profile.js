import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    userData: {},
    isLoading: false,
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const data = await getUser();
      this.setState({
        isLoading: false,
        userData: data,
      });
    });
  }

  render() {
    const { isLoading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? (
          <Loading />
        ) : (
          <div>
            <h2>Nome:</h2>
            <h3>{ userData.name }</h3>
            <h2>Email:</h2>
            <h3>{ userData.email }</h3>
            <h2>Descrição:</h2>
            <h3>{ userData.description }</h3>
            <h2>Nome:</h2>
            <img
              data-testid="profile-image"
              src={ userData.image }
              alt="Foto de perfil"
            />
            <br />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
