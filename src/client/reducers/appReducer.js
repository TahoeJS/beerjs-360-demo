import {CAPTURE, LOADING, SESSION} from '../constants/actionTypes'

const initialState = {
  image: '/images/IMG_1389.JPG',
  loading: false,
  session: null
}

export default function appReducer (state = initialState, action) {
  switch (action.type) {
    case CAPTURE:
      return {
        ...state,
        image: action.payload
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case SESSION:
      return {
        ...state,
        session: action.payload
      }
    default:
      return state
  }
}
