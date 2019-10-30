import React, { Component } from "react";
import { Container } from "react-bootstrap";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmitSignUp = e => {
    fetch("http://localhost:3000/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
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
        <section className="signup">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form onSubmit={this.onSubmitSignUp} id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required="required"
                    placeholder="Your Name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    onChange={this.onEmailChange}
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={this.onPasswordChange}
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="re-pass">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="re_pass"
                    id="re_pass"
                    placeholder="Repeat your password"
                    required="required"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                    onClick={this.onSubmitSignUp}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="images/signup-image.jpg" alt="sing up" />
              </figure>
              <p
                onClick={() => this.props.onRouteChange("signin")}
                className="signup-image-link"
                style={{ cursor: "pointer" }}
              >
                I am already member
              </p>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}
export default SignUp;
