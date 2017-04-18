const fetch = require('node-fetch')
const baseURL = 'http://192.168.1.1'
const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charser=utf-8'
}

const api = {
  request (url, options, passThrough) {
    return new Promise((resolve, reject) => {
      fetch(url, options).then(
        (response) => {
          if (response.ok) {
            response.json().then(
              (json) => {
                if (passThrough) {
                  json = {
                    ...json,
                    ...passThrough
                  }
                }

                resolve(json)
              }
            )
          } else {
            // Response is not ok
            response.json().then(
              (json) => {
                reject({
                  error: json
                })
              }
            )
          }
        },
        (error) => {
          reject({ error })
        }
      )
    })
  },
  get (endpoint, passThrough) {
    const options = {
      headers: HEADERS,
      method: 'GET',
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  },
  post (endpoint, data, passThrough) {
    const options = {
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  },
  put (endpoint, data, passThrough) {
    const options = {
      headers: HEADERS,
      method: 'PUT',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  },
  delete (endpoint, passThrough) {
    const options = {
      headers: HEADERS,
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  }
}

export default api
