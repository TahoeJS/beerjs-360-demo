import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'

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

        <nav style={{display: 'flex'}}>
          <Link to="/viewer">
            <button className="mdl-button mdl-js-button mdl-button--colored">
              Viewer
            </button>
          </Link>
          <Link to="/aframe">
            <button className="mdl-button mdl-js-button mdl-button--colored">
              Aframe
            </button>
          </Link>
        </nav>

        <div style={{display: 'flex'}}>
          Camera
        </div>
      </div>
    )
  }
}
