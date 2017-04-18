import axios from 'axios'
const baseURL = window.location.origin
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charser=utf-8'
}

function request (url, options, passThrough) {
  return new Promise((resolve, reject) => {
    axios(url, options).then(
      (response) => {
        if (response.statusText === 'OK') {
          if (passThrough) {
            response.data = {
              ...response.data,
              ...passThrough
            }
          }
          resolve(response.data)
        } else {
          reject({
            status: response.status,
            statusText: response.statusText
          })
        }
      },
      (err) => {
        reject(err.response)
      }
    )
  })
}

export const api = {
  get (url, passThrough) {
    const options = {
      headers: HEADERS,
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  post (url, data, passThrough) {
    const options = {
      data,
      headers: HEADERS,
      method: 'POST',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  put (url, data, passThrough) {
    const options = {
      data,
      headers: HEADERS,
      method: 'PUT',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  delete (url, passThrough) {
    const options = {
      headers: HEADERS,
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  }
}
