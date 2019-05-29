import React from 'react';
import { AuthUserContext } from './Session/index';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import SignOut from './SignOut';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';
import PropTypes from 'prop-types';

const Navigation = ({ isOpen, toggle }) => {
  return (
    <div>
      {/* consume context provided in session index based on if user is authed */}
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <Navbar
              className="shadow fixed-top"
              color="light"
              light
              fixed="fixed"
              expand="md"
            >
              <NavbarBrand href={ROUTES.LANDING}>
                React Firebase Chat
              </NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {/* conditionally render navbar items based on if a user is signed in or not */}
                  {authUser ? (
                    <React.Fragment>
                      <NavItem>
                        <NavLink
                          onClick={toggle}
                          className="navStyle nav-link"
                          to={ROUTES.HOME}
                        >
                          Home
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={toggle}
                          className="navStyle nav-link"
                          to={ROUTES.ACCOUNT}
                        >
                          Account
                        </NavLink>
                      </NavItem>
                      {/* RESTRICT ADMIN */}
                      {ROLES.ADMIN.includes(authUser.email) && (
                        <NavItem>
                          <NavLink
                            onClick={toggle}
                            className="navStyle nav-link"
                            to={ROUTES.ADMIN}
                          >
                            Admin
                          </NavLink>
                        </NavItem>
                      )}
                      <NavItem>
                        <SignOut />
                      </NavItem>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <NavItem>
                        <NavLink
                          onClick={toggle}
                          className="navStyle nav-link"
                          to={ROUTES.SIGN_UP}
                        >
                          Sign Up
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={toggle}
                          className="navStyle nav-link"
                          to={ROUTES.SIGN_IN}
                        >
                          Sign In
                        </NavLink>
                      </NavItem>
                    </React.Fragment>
                  )}
                </Nav>
              </Collapse>
            </Navbar>
          </>
        )}
      </AuthUserContext.Consumer>
    </div>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
};

export default Navigation;
