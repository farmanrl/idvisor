import React, { Component, PropTypes } from 'react';
import Clarifai from 'clarifai';

const model = "";

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model,
      train: '',
      test: '',
      concepts: null,
    };
  }

  handleTrainUrl = (e) => {
    this.setState({ train: e.target.value });
  }

  handleTestUrl = (e) => {
    this.setState({ test: e.target.value });
  }

  getValidation = () => {
    const url = this.state.url;
    if (url.match(/\.(jpeg|jpg|tiff|bmp|png)$/) !== null) {
      return 'success';
    }
    return 'error';
  }

  train = () => {
    app.inputs.create([{
      "url": this.state.train,
      "concepts": [
        "id"
  }

  render() {
    return (
      <h1>Model</h1>
      handleChange = (e) => {
        this.setState({ url: e.target.value });
      }

    );
  }
}

Model.propTypes = {
  app: PropTypes.object,
};

export default Model;
