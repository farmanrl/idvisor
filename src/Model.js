import React, { Component, PropTypes } from 'react';
import Clarifai from 'clarifai';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, ControlLabel, Button, Checkbox, Grid, Row, Col, Well, Panel } from 'react-bootstrap';

const model = "a9b504eba0f94777b08de8f20335e693";

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const column = {
  maxWidth: 320,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const array = {
  maxHeight: 320,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'scroll',
}

const row = {
  maxWidth: '95%',
  overflowX: 'scroll',
  display: 'flex',
}

const rowItem = {
  margin: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const img = {
  height: 150,
  width: 'auto'
}

const colImg = {
  height: 'auto',
  width: '100%'
}

const view = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '90%'
}


class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'memes',
      train: '',
      test: '',
      inputArray: [],
      meme: false,
      memeReport: null,
      trueArray: [],
      falseArray: [],
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

  add = () => {
    if (this.getTrainValidation() === 'success') {
      const inputArray = this.state.inputArray;
      inputArray.push({
        url: this.state.train,
        concepts: [
          {
            id: 'meme',
            value: this.state.meme
          }
        ]
      });
      this.setState({ train: '', meme: false, inputArray })
    }
  }

  remove = (index) => {
    const inputArray = this.state.inputArray;
    inputArray.splice(index, 1);
    this.setState({ inputArray });
  }

  change = (input, index) => {
    const inputArray = this.state.inputArray;
    inputArray[index] = {
      url: input.url,
      concepts: [
        {
          id: input.concepts[0].id,
          value: !input.concepts[0].value
        }
      ]
    }
    this.setState({ inputArray });
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

  input = () => {
    this.props.app.inputs.create(this.state.inputArray).then(this.train);
  }

  train = () => {
    this.props.app.models.train(this.state.model).then(
      (response) => {
        console.log(response);
        this.setState({ inputArray: [] });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  view = () => {
    this.props.app.models.initModel('memes').then(
      (model) => {
        model.getInputs({perPage: 100}).then(
          (response) => {
            console.log(response);
            const trueArray = [];
            const falseArray = [];
            response.data.inputs.forEach((input, index) => {
              if (input.data.concepts["0"].value === 1) {
                trueArray.push(input.data.image.url);
              } else {
                falseArray.push(input.data.image.url);
              }
            });
            this.setState({ trueArray, falseArray });
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  close = () => {
    this.setState({ trueArray: [], falseArray: [] });
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
      <Grid fluid>
        <h1>Meme Detector</h1>
        <Row>
          <Col sm={12} lg={4}>
            <Panel>
              <h2>Input</h2>
              <h4>Add some inputs, then train the model!</h4>
              <div style={style}>
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
                  Is this a meme?
                </Checkbox>
                <Button type="submit" onClick={this.add}>
                  Submit
                </Button>
                {this.state.inputArray.length > 0 ?
                 <div>
                   <br />
                   <div style={row}>
                     {this.state.inputArray.length > 0 ?
                      this.state.inputArray.map((input, index) => (
                        <Well key={index} bsSize="small">
                          <div style={rowItem}>
                            <img src={input.url} style={img} role="presentation" />
                            <Button bsStyle="link" onClick={() => this.change(input, index)}>
                              <h4>{input.concepts[0].id}</h4>
                              <h5>{input.concepts[0].value.toString()}</h5>
                            </Button>
                            <div style={{ width: 20 }}>
                              <Button bsSize="xsmall" bsStyle="danger" onClick={() => this.remove(index)}>X</Button>
                            </div>
                          </div>
                        </Well>
                      ))
                    : null
                   }
                   </div>
                 </div>
                 : null}
              </div>
              {this.state.inputArray.length > 0 ?
               <div>
                 <br />
                 <p>Click on any item to change its value</p>
                 <p>or click x to remove from array</p>
                 <br />
                 <h4>When you're ready, click train!</h4>
                 <Button type="submit" bsStyle="primary" onClick={this.input}>
                   Train
                 </Button>
               </div>
               : null}
            </Panel>
          </Col>
          <Col sm={12} lg={4}>
            <Panel>
              <h2>View</h2>
              <h4>View the images used to train the model!</h4>
              <Button type="submit" onClick={this.view} bsStyle="primary">
                View
              </Button>
              {(this.state.trueArray.length > 0 || this.state.falseArray.length > 0) ?
               <div style={style}>
                 <div style={view}>
                   <div>
                     <h4>True</h4>
                     <div style={array}>
                       {this.state.trueArray ?
                        this.state.trueArray.map((item, index) => (
                          <img src={item} style={colImg} role="presentation" />
                        ))
                        : null}
                     </div>
                   </div>
                   <div>
                     <h4>False</h4>
                     <div style={array}>
                       {this.state.falseArray ?
                        this.state.falseArray.map((item, index) => (
                          <img src={item} style={colImg} role="presentation" />
                        ))
                        : null}
                     </div>
                   </div>
                 </div>
                 <br />
                 <Button type="submit" bsStyle="danger" onClick={this.close}>
                   Close
                 </Button>
               </div>
               : null}
            </Panel>
          </Col>
          <Col sm={12} lg={4}>
            <Panel>
              <h2>Test</h2>
              <h4>Test the model with an image!</h4>
              <div style={style}>
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
                <Button type="submit" bsStyle="primary" onClick={this.test}>
                  Submit
                </Button>
                {this.state.memeTest ?
                 <div>
                   <br />
                   <Well>
                     <img
                         src={this.state.memeTest}
                         role="presentation"
                         style={{ maxWidth: '90%', maxHeight: 200 }}
                     />
                   </Well>
                 </div>
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
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Model.propTypes = {
  app: PropTypes.object,
};

export default Model;
