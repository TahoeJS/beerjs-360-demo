import React, {Component, PropTypes} from 'react'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {jssStyles} from './viewer.jss'

const mapStateToProps = state => ({
  image: state.app.image
})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@injectSheet(jssStyles)
@connect(mapStateToProps, mapDispatchToProps)
export default class Viewer extends Component {
  static propTypes = {
    image: PropTypes.any,
    invertControls: PropTypes.bool,
    rotation: PropTypes.string,
    sheet: PropTypes.object.isRequired,
    zoom: PropTypes.number
  }

  static defaultProps = {
    invertControls: true,
    rotation: '0 0 0',
    zoom: 1
  }

  render () {
    const {
      image,
      invertControls,
      rotation,
      sheet: {classes},
      zoom
    } = this.props

    if (!image) return false

    return (
      <div className={classes.viewer}>
        <a-scene>
          <a-entity
            scale="1 1 -1"
            material={`shader: flat; src: ${image}`}
            id="sky"
            geometry="primitive: sphere; radius: 100"
            src={image}
          />

          <a-entity id="origin" position="0 0 0" />

          <a-entity
            id="camera"
            ref={(el) => { this.cameraEl = el }}
            rotation={rotation}
            camera={`zoom: ${zoom}; active: true;`}
            look-controls={`reverseMouseDrag: ${!invertControls}`}
            mouse-cursor
          >
            <a-cursor fuse="true" color="yellow" />
          </a-entity>
        </a-scene>
      </div>
    )
  }
}
