import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

class Login extends React.Component {
  render() {
    const {
      isButtonDisabled,
      onInputChange,
      onCreateUserClick,
      loadingLogin,
      isLoginLoaded,
    } = this.props;

    return (
      <div data-testid="page-login">
        { isLoginLoaded && <Redirect to="/search" /> }
        { loadingLogin ? (
          <Loading />
        ) : (
          <form>
            <input
              name="loginNameInput"
              type="text"
              data-testid="login-name-input"
              onChange={ onInputChange }
            />
            <button
              name="loginSubmitButton"
              type="button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ onCreateUserClick }
            >
              Salvar
            </button>
          </form>
        ) }
      </div>
    );
  }
}

Login.propTypes = {
  isButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onCreateUserClick: PropTypes.func,
  loadingLogin: PropTypes.bool,
  isLoginLoaded: PropTypes.bool,
};

Login.defaultProps = {
  isButtonDisabled: '',
  onInputChange: '',
  onCreateUserClick: '',
  loadingLogin: false,
  isLoginLoaded: false,
};

export default Login;
