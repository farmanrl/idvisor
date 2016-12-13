import React, { Component, PropTypes } from 'react';

class Search extends Component {
  render() {
    return (
      <h1>Search</h1>
    );
  }
}

Search.propTypes = {
  app: PropTypes.object,
};

export default Search;
