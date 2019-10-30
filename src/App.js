import React from "react";
import DashBoard from "./components/DashBoard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import "./App.css";

const initialState = {
  isSignedIn: false,
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  updateEntries = data => {
    this.setState(Object.assign(this.state.user, { entries: data }));
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        <NavBar
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <DashBoard
            updateEntries={this.updateEntries}
            user={this.state.user}
          />
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
