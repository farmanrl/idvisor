import React, { Component, PropTypes } from 'react';
import Clarifai from 'clarifai';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, ControlLabel, Button, Checkbox, Panel, Well, Col, Grid } from 'react-bootstrap';
import ColorIcon from './ColorIcon';

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
const colors = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
}

class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = { model: 'general', url: '', prediction: '', concepts: null, colors: null, checked: false };
  }

  handleChange = (e) => {
    this.setState({ url: e.target.value });
  }

  handleMenu = (key) => {
    console.log(key);
    this.setState({ model: key });
  }

  getValidation = () => {
    const url = this.state.url;
    if (url.match(/\.(jpeg|jpg|tiff|bmp|png)$/) !== null) {
      return 'success';
    }
    return 'error';
  }

  predict = () => {
    const prediction = this.state.url
    this.setState({ prediction, concepts: null, colors: null });
    let model = null
    switch (this.state.model) {
      case 'general': {
        model = Clarifai.GENERAL_MODEL
        break;
      }
      case 'food': {
        model = Clarifai.FOOD_MODEL
        break;
      }
      case 'travel': {
        model = Clarifai.TRAVEL_MODEL
        break;
      }
      case 'wedding': {
        model = Clarifai.WEDDING_MODEL
        break;
      }
      default:
        break;
    }
    this.props.app.models.predict(model, prediction).then(
      (response) => {
        console.log(response);
        const concepts = response.data.outputs["0"].data.concepts;
        this.setState({ concepts });
      },
      (err) => {
        console.error(err);
      }
    );
    if (this.state.checked) {
      this.props.app.models.predict(Clarifai.COLOR_MODEL, prediction).then(
        (response) => {
          const colors = response.data.outputs["0"].data.colors
          this.setState({ colors });
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <Grid>
        <h1>Image Recognition</h1>
        <Col>
          <Panel>
            <h2>Search</h2>
            <h4>Search through models for image classifications!</h4>
            <div style={style}>
              <FormGroup validationState={this.getValidation()}>
                <InputGroup>
                  <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="Enter url"
                      onChange={this.handleChange}
                  />
                  <DropdownButton
                      componentClass={InputGroup.Button}
                      id="input-dropdown-addon"
                      title={this.state.model}
                  >
                    <MenuItem
                        onClick={() => this.setState({ model: 'general'})}
                        key="general">
                      General
                    </MenuItem>
                    <MenuItem
                        onClick={() => this.setState({ model: 'food'})}
                        key="food">
                      Food
                    </MenuItem>
                    <MenuItem
                        onClick={() => this.setState({ model: 'travel'})}
                        key="travel">
                      Travel
                    </MenuItem>
                    <MenuItem
                        onClick={() => this.setState({ model: 'wedding'})}
                        key="wedding">
                      Wedding
                    </MenuItem>
                  </DropdownButton>
                </InputGroup>
              </FormGroup>
            </div>
            <Checkbox
                checked={this.state.checked}
                onChange={() => this.setState({ checked: !this.state.checked })}
            >
              Colors
            </Checkbox>
            <Button type="submit" onClick={this.predict}>
              Submit
            </Button>
            {this.state.prediction ?
             <div>
               <br />
               <Well>
                 <img src={this.state.prediction} style={{ maxWidth: '90%', maxHeight: 200 }} role="presentation"/>
               </Well>
             </div>
             : null
            }
        <br />
        <div style={ colors }>
          {this.state.colors ?
           this.state.colors.map((color, index) => (
             <ColorIcon name={color.w3c.name} hex={color.w3c.hex} key={index} />
           ))
           : null
          }
        </div>
        {this.state.concepts ?
         this.state.concepts.map((concept, index) => (
           <div key={index}>
             <h4>{concept.name}</h4>
             <h5>{concept.value}</h5>
           </div>
         ))
         : null}
          </Panel>
        </Col>
      </Grid>
    );
  }
}

Predict.propTypes = {
  app: PropTypes.object,
};

export default Predict;
