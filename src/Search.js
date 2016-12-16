import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Clearfix, Panel } from 'react-bootstrap';


class Search extends Component {
  render() {
    return (
      <Grid >
        <Row className="show-grid">
          <Col sm={12} md={1} fluid>
          </Col>
          <Col sm={12} md={10} fluid>
            <h1>About</h1>

            <Panel>
              <h4><a href="https://github.com/farmanrl/idvisor/">View the source code on GitHub</a></h4>
            <p>This application was created by Richard Farman as part of an Artificial Intelligence course taught at Whitman College.</p>
            <p>As a final project, this is a demonstration of the principles and practices behind designing and building an AI system.</p>
            <p>The framework that makes this app possible is a neural network that takes images as inputs and classifications as outputs.</p>
            <p>Each image is analyzed and categorized based on the content of the image, drawing comparisons to other known image categories.</p>
            <p>To increase the capabilities of the AI, we train the system using predefined images. These training inputs form our model.</p>
            <p>The main feature of this application is the meme detector, a simple model trained specifically for this project.</p>
            <p>Using memes as a true output, and other images as a false output, we can form our model by defining inputs and then training on the output.</p>
            <p>From there, we can test our model by supplying an image and seeing whether it is classified as a meme or otherwise.</p>
            <p>Generally, this model is suprisingly accurate, given the limited range of training inputs!</p>
            <p>As much as possible, I wanted to provide a diverse set of images for both classifications, to avoid generalizations.</p>
            <p>For this reason, I included things like posters and subtitles in the non-meme category, since this will offset any tendencies towards any text based image being classified as a meme.</p>
            <p>Feel free to train with any images you like, so long as they're appropriate and properly classified! You can also view what images have been trained so far.</p>
            <p>In addition, the search feature demonstrates the full potential of computer vision when it comes to image recognition.</p>
            <p>However, these are based on models not generated within the scope of this project, and are unrelated to the final product.</p>
            <p>View the API I used to make this happen below!</p>
            <a href="https://www.clarifai.com/">Clarifai</a>
            </Panel>
          </Col>
          <Col sm={12} md={1} fluid>
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
