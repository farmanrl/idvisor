import React, { Component, PropTypes } from 'react';
import Clarifai from 'clarifai';
import Predict from './Predict';
import Search from './Search';
import Model from './Model';

// instantiate a new Clarifai app passing in your clientId and clientSecret
var app = new Clarifai.App(
  'Iu6a03pfrFQ3wyzC5-exMgVQEHt7BrNyMvqsFSe8',
  'MQIfp3LDZpSOIlaTtRNfNwv5j4z8JuIIFln2-NE8'
);

class Content extends Component {
  render() {
    return (
      <div>
        {this.props.active === 'predict' &&
        <Predict app={app} />
        }
        {this.props.active === 'search' &&
        <Search app={app} />
        }
        {this.props.active === 'model' &&
        <Model app={app}/>
        }
      </div>
    );
  }
}

Content.propTypes = {
  active: PropTypes.string,
};


export default Content;
