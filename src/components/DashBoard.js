import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { ReactComponent as AddPhoto } from "./add_photo.svg";
import Clarifai from "clarifai";
import "./DashBoard.css";

// https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg

const app = new Clarifai.App({
  apiKey: "bb9926062f474e18a4d87aef278a01af"
});

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
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = e => {
    e.preventDefault();
    this.setState({ imgUrl: this.state.input });

    console.log("click");
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        console.log(response);
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  render() {
    const { box } = this.state;
    return (
      <Container>
        <section class="sign-in">
          <div class="signin-content">
            <div class="signin-form">
              <h2 class="form-title">Choose Image</h2>
              <form onSubmit={this.onPictureSubmit}>
                <div class="form-group">
                  <label for="add_picture">
                    {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
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
                <div class="form-group form-button">
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    class="form-submit"
                    value="Detect"
                  />
                </div>
              </form>
            </div>
            {/* //image face detect */}
            <div class="signup-image">
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
