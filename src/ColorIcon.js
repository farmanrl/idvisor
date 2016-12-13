import React, { Component, PropTypes } from 'react';

class ColorIcon extends Component {
  render() {
    const style = {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: this.props.hex,
    }
    const color = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 200,
    }
    console.log(style);
    return (
      <div style={ color }>
        <div style={ style }></div>
        <h5>{this.props.name}</h5>
      </div>
    );
  }
}

ColorIcon.propTypes = {
  name: PropTypes.string,
  hex: PropTypes.string,
};

export default ColorIcon;
