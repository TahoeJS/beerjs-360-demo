import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'
import {captureImage} from '../../actions/appActions'
import Loader from '../Loader'

const mapStateToProps = state => ({
  loading: state.app.loading
})
const mapDispatchToProps = dispatch => (bindActionCreators({
  captureImage
}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    captureImage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render () {
    const {captureImage, loading} = this.props

    const cameraStyle = {
      cursor: 'pointer',
      fontSize: 38,
      position: 'relative',
      top: 5
    }

    const articleStyle = {
      marginBottom: 50
    }

    return (
      <div>
        <Loader visible={loading} />

        <h1>BeerJS Dem<a onClick={captureImage} style={cameraStyle} className="material-icons">camera</a></h1>

        <hr />

        <section style={{padding: '25px 150px 0'}}>
          <article style={articleStyle}>
            <h2>OSC Open Spherical Camera</h2>
            <p>Open Spherical Camera API is a proposed set of commands for a variety of spherical cameras with built-in WiFi. The goal is to allow any app developed against this API on any platform to control any connected spherical camera that implements the API.</p>
            <p><a href="https://developers.google.com/streetview/open-spherical-camera/reference/">Api spec</a></p>
          </article>

          <article style={articleStyle}>
            <h2>Aframe</h2>
            <p>A-Frame is an open-source web framework for building virtual reality experiences. We can build VR web pages that we can walk inside with just HTML. Under the hood, it is a three.js framework that brings the entity-component-system pattern to the DOM.</p>
            <p><a href="https://aframe.io/">aframe.io</a></p>
            <Link to="/aframe">
              <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                <i className="material-icons">play_arrow</i>
              </button>
            </Link>
          </article>

          <article style={articleStyle}>
            <h2>360 Photography</h2>
            <p>This is a type of photography where you use a specialized camera to capture the entire surrounding of a location instead of just one angle.</p>
            <Link to="/viewer">
              <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
                <i className="material-icons">3d_rotation</i>
              </button>
            </Link>
          </article>
        </section>
      </div>
    )
  }
}
