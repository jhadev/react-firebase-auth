import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../constants/routes';
import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { withFirebase } from '../components/Firebase/index';
import Row from '../components/common/Row';
import Column from '../components/common/Column';

const SignIn = () => (
  <div>
    <h1 className="text-center my-4">Sign In</h1>
    <SignInForm />
    <Row helper="justify-content-center">
      <Column size="md-6 12">
        <PasswordForgetLink />
        <SignUpLink />
      </Column>
    </Row>
  </div>
);

class SignInFormBase extends Component {
  state = {
    email: '',
    password: '',
    error: null
  };

  onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    localStorage.setItem('email', email);

    this.props.firebase
      .doSignInUser(email, password)
      .then(() => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(`Welcome, ${email}`));
        this.setState({ email: '', password: '', error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Row helper="justify-content-center">
        <Column size="md-6 12">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </div>
            <button
              className="btn btn-false mb-2"
              disabled={isInvalid}
              type="submit"
            >
              Sign In
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </Column>
      </Row>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignIn;

export { SignInForm };