import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { ReactComponent as AddPhoto } from "./add_photo.svg";
import "./DashBoard.css";

// https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg

class DashBoard extends Component {
  state = {
    input: "",
    imgUrl: "",
    box: {}
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = e => {
    e.preventDefault();
    this.setState({ imgUrl: this.state.input });
    console.log("click");
    fetch("https://safe-beyond-46421.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response) {
          fetch("https://safe-beyond-46421.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.props.user.id
            })
          })
            .then(response => {
              response.json().then(count => {
                console.log(count);
                this.props.updateEntries(count);
              });
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { box } = this.state;
    const { name, entries } = this.props.user;
    return (
      <Container>
        <section className="sign-in">
          <div className="signin-content">
            <div className="signin-form">
              <h4 className="form-title">
                {`${name}, your entry count is : `} <span>{`${entries}`}</span>
              </h4>
              <h2 className="form-title">Choose Image</h2>
              <form onSubmit={this.onPictureSubmit}>
                <div className="form-group">
                  <label htmlFor="add_picture">
                    {/* <i className="zmdi zmdi-account material-icons-name"></i> */}
                    <AddPhoto />
                  </label>
                  <input
                    type="text"
                    name="add_picture"
                    id="add_picture"
                    placeholder="Enter your image URL here"
                    onChange={this.onInputChange}
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    className="form-submit"
                    value="Detect"
                  />
                </div>
              </form>
            </div>
            {/* //image face detect */}
            <div className="signup-image">
              <div>
                <figure style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <img
                      id="inputimage"
                      src={this.state.imgUrl}
                      // width="500px"
                      height="auto"
                      alt="sign up"
                    />
                    <div
                      className="bounding-box"
                      style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.bottomRow,
                        left: box.leftCol
                      }}
                    ></div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}
export default DashBoard;

// if (response) {
//   fetch("http://localhost:3000/image", {
//     method: "put",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       id: this.state.user.id
//     })
//   })
//     .then(response => response.json())
//     .then(count => {
//       this.setState(Object.assign(this.state.user, { entries: count }));
//     })
// }
