import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Login extends Component {

  handleLogin(e) {
    e.preventDefault();
    const { username, password, info } = this.refs;

    const creds = { username: username.value.trim(), password: password.value, info: info.value.trim() };
    this.props.onLoginClick(creds);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <form onSubmit={e => this.handleLogin(e)}>
        <input type="text" ref="info" className="form-control" style={{ marginRight: '5px' }} placeholder="Info"/>
        <input type="text" ref="username" className="form-control" style={{ marginRight: '5px' }} placeholder="Username"/>
        <input type="password" ref="password" className="form-control" style={{ marginRight: '5px' }} placeholder="Password"/>
        <button type="submit" onClick={e => this.handleLogin(e)} className="btn btn-primary login-button" disabled={isFetching}>
          {isFetching ? 'Logging in...' : 'Login'}
        </button>
      </form>
    );
  }
}

export function mapStateToProps(state) {
  const { isFetching } = state.auth;
  return {
    isFetching,
  };
}


Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Login);
