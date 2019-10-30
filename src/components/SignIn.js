import React, { Component } from "react";
import { Container } from "react-bootstrap";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  onEmailChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmitSignIn = e => {
    fetch("https://safe-beyond-46421.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <Container>
        <section className="sign-in">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src="images/signin-image.jpg" alt="sing up" />
              </figure>
              <p
                href="#"
                onClick={() => this.props.onRouteChange("signup")}
                className="signup-image-link"
              >
                Create an account
              </p>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <div
                className="register-form"
                onSubmit={this.onSubmitSignIn}
                id="login-form"
              >
                <div className="form-group">
                  <label htmlFor="your_email">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your E-mail"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    onClick={this.onSubmitSignIn}
                  />
                </div>
              </div>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <a href="http://www.facebook.com">
                      <i className="display-flex-center zmdi zmdi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.twitter.com">
                      <i className="display-flex-center zmdi zmdi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.google.com">
                      <i className="display-flex-center zmdi zmdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}
export default SignIn;
