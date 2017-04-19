import {CAPTURE, LOADING, SESSION} from '../constants/actionTypes'
import {api} from '../services/api'

export function captureImage () {
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true
    })

    api.post('camera/capture').then(
      (data) => {
        console.log('data', data)
        dispatch({
          type: SESSION,
          payload: data.sessionId
        })

        dispatch({
          type: CAPTURE,
          payload: `/${data.uri}`
        })

        dispatch({
          type: LOADING,
          payload: false
        })
      },
      (err) => {
        console.error(err)

        dispatch({
          type: LOADING,
          payload: false
        })
      }
    )
  }
}
