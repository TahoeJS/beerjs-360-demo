import './loader.scss'
import React, {PropTypes} from 'react'

const Loader = ({visible}) => {
  return (
    <div className="loader-wrapper" style={{display: (visible) ? 'block' : 'none'}}>
      <div className="loader">Loading...</div>
    </div>
  )
}

Loader.propTypes = {
  visible: PropTypes.bool
}

export default Loader
