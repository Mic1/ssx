import React, { Component } from "react";
import PropTypes from "prop-types";
import Login from "../components/Login"; // eslint-disable-line import/no-named-as-default
import Logout from "../components/Logout"; // eslint-disable-line import/no-named-as-default
import { connect } from "react-redux";
import * as authActions from "../actions/authActions";
import { IndexLink, Link } from "react-router";

export class Navbar extends Component {
  render() {
    const {
      username,
      isAuthenticated,
      isSignedIn,
      isAdmin,
      logout,
      cartCount,
      signin,
    } = this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <IndexLink to="/" className="navbar-brand" activeClassName="active">
              WordGame
            </IndexLink>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              {isSignedIn && (
                <li>
                  <Link to="/game">Game</Link>
                </li>
              )}
            </ul>

            <div className="navbar-form navbar-right">
              {!isAuthenticated && <Login onLoginClick={signin} />}

              {isAuthenticated && (
                <div>
                  <ul className="nav navbar-nav">
                    {isAdmin && (
                      <li>
                        <Link to="/products/admin">Administration</Link>
                      </li>
                    )}
                    <li>
                      <Link to="/profile">{username}</Link>
                    </li>
                  </ul>
                  <div className="navbar-form navbar-left">
                    <Logout onLogoutClick={logout} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { token, username, roles, plyrId } = state.auth;
  const { items } = state.cart;
  return {
    isSignedIn: plyrId > 0,
    isAuthenticated: !!token,
    username,
    isAdmin: roles.indexOf("admin") > -1,
    cartCount: items.length,
  };
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  cartCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { ...authActions })(Navbar);
