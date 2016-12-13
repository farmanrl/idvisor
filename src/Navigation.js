import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import Content from './Content';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 'predict' };
  }

  handleSelect = (selectedKey) => {
    this.setState({ active: selectedKey });
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" justified activeKey={this.state.active} onSelect={this.handleSelect}>
          <NavItem eventKey="predict">Predict</NavItem>
          <NavItem eventKey="search">Search</NavItem>
          <NavItem eventKey="model">Model</NavItem>
        </Nav>
        <Content active={this.state.active}/>
      </div>
    );
  }
}

export default Navigation;
