import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Viewer from '../Viewer'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch))

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {}
  static defaultProps = {}
  state = {}

  render () {
    return (
      <div>
        <h1>BeerJS Demo</h1>
        <Viewer
          invertControls={true}
          rotation="0 0 0"
          zoom={1}
        />
      </div>
    )
  }
}
