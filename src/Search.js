import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

class Search extends Component {
  render() {
    return (
      <Grid >
        <Row className="show-grid">
          <Col sm={12} md={4}>

          </Col>
          <Col sm={12} md={4}>
          </Col>
          <Col sm={12} md={4}>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Search.propTypes = {
  app: PropTypes.object,
};

export default Search;
