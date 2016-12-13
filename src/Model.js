import React, { Component, PropTypes } from 'react';
import Clarifai from 'clarifai';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, ControlLabel, Button, Checkbox } from 'react-bootstrap';

const model = "a9b504eba0f94777b08de8f20335e693";

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const column = {
  width: 500,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'memes',
      train: '',
      test: '',
      meme: false,
      memeReport: null
    };
  }

  handleTrainUrl = (e) => {
    this.setState({ train: e.target.value });
  }

  handleTestUrl = (e) => {
    this.setState({ test: e.target.value });
  }

  getTestValidation = () => {
    const url = this.state.train;
    if (url.match(/\.(jpeg|jpg|tiff|bmp|png)$/) !== null) {
      return 'success';
    }
    return 'error';
  }

  getTrainValidation = () => {
    const url = this.state.train;
    if (url.match(/\.(jpeg|jpg|tiff|bmp|png)$/) !== null) {
      return 'success';
    }
    return 'error';
  }


  input = () => {
    this.setState({ train: '', meme: false });
    this.props.app.inputs.create({
      url: this.state.train,
      concepts: [
        {
          id: 'meme',
          value: this.state.meme
        }
      ]
    });
  }

  model = () => {
    this.props.app.models.create(
      "memes",
      [
        { id: 'meme' }
      ]
    ).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  train = () => {
    this.props.app.models.train(this.state.model).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  test = () => {
    this.setState({ memeReport: null, memeTest: this.state.test });
    console.log(this.state.model, [this.state.test]);
    this.props.app.models.predict(this.state.model, [this.state.test]).then(
      (response) => {
        console.log(response);
        const memeReport = response.data.outputs["0"].data.concepts;
        this.setState({ memeReport });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  render() {
    console.log(this.state);
    return (
      <div style={style}>
        <h1>Meme Detector</h1>
        <h2>Input</h2>
        <div style={column}>
          <FormGroup validationState={this.getTrainValidation()}>
            <InputGroup>
              <FormControl
                  type="text"
                  value={this.state.train}
                  placeholder="Enter url"
                  onChange={this.handleTrainUrl}
              />
            </InputGroup>
          </FormGroup>
          <Checkbox
              checked={this.state.meme}
              onChange={() => this.setState({ meme: !this.state.meme })}
          >
            Meme
          </Checkbox>
          <Button type="submit" onClick={this.input}>
            Submit
          </Button>
          <h4>Once you've added some inputs, train the model!</h4>
          <Button type="submit" onClick={this.train}>
            Train
          </Button>
        </div>
        <h2>Test</h2>
        <div style={column}>
          <FormGroup validationState={this.getTestValidation()}>
            <InputGroup>
              <FormControl
                  type="text"
                  value={this.state.test}
                  placeholder="Enter url"
                  onChange={this.handleTestUrl}
              />
            </InputGroup>
          </FormGroup>
          <Button type="submit" onClick={this.test}>
            Submit
          </Button>
          <hr />
          {this.state.memeTest ?
           <img
               src={this.state.memeTest}
               role="presentation"
               style={{ maxWidth: 500 }}
           />
          : null
          }
          {this.state.memeReport ?
           this.state.memeReport.map((concept, index) => (
             <div key={index}>
               <h4>{concept.name}</h4>
               <h5>{concept.value}</h5>
             </div>
           ))
           : null}
        </div>
      </div>
    );
  }
}

Model.propTypes = {
  app: PropTypes.object,
};

export default Model;
