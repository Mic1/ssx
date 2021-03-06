import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthGuard from '../components/AuthGuard'; // eslint-disable-line import/no-named-as-default
import { connect } from 'react-redux';
import Logout from '../components/Logout'; // eslint-disable-line import/no-named-as-default
import * as authActions from '../actions/authActions';

export class ProfilePage extends Component {

  render() {
    const { username, token, logout } = this.props;
    return (
      <div className="container">
        <AuthGuard redirectTo="/" />
        <p>Your username is: {username}</p>
        <p>Your token is: {token}</p>
        <div>
          <Logout onLogoutClick={() => logout()} />
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};

export function mapStateToProps(state) {
  const { username, token } = state.auth;

  return {
    username,
    token
  };
}

export default connect(mapStateToProps, { ...authActions })(ProfilePage);
