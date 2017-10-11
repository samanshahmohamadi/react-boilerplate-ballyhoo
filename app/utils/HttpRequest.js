/**
 * Created by saman on 3/12/17.
 */
import axios from 'axios';
import {browserHistory} from 'react-router'
const Config = {}
// Config.UMBackendAddr = 'http://localhost:8080'
Config.UMBackendAddr = 'http://utadoc.com'
Config.SabtshodBackendAddr = 'http://sabtshod.com'

export default class HttpRequest {
  constructor() {
    this.instance = axios.create()
    this.instance.defaults.headers['Content-Type'] = undefined
  }

  get(url, params) {
    return this.instance.get(Config.UMBackendAddr + url, {
      params: params
    })
      .then(payload => {
        return payload
      })
      .catch(err => {
        console.error(err)
        // if Unauthorized
        /*if (err.response.status === 401 || err.response.status === 511) {
         return new Promise(() => {
         store.dispatch({
         type: 'LOGGED_OUT',
         payload: {}
         })
         localStorage.clear()
         return browserHistory.push('/')
         })*/
        /*} else {
         throw new Error(err.response.status)
         }*/
      })
  }

  post(url, params, config = null) {
    let urlParams = new URLSearchParams();
    for (let k in params) urlParams.append(k, params[k])
    return this.instance.post(Config.UMBackendAddr + url, urlParams, config)
      .then(payload => {
        if (payload.status !== 200) throw new Error(payload.status)
        return payload
      })
      .catch(error => {
        if (error.response) {
          return Promise.reject(error.response.status)
        } else if (error) {
          return Promise.reject(error)
        } else {
          return Promise.reject(400)
        }
      })
  }

  postFile(formData, server) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    console.log("FORM DATA" + formData)
    let url
    if (server === 'um') {
      url = Config.UMBackendAddr + '/createTnx'
    } else if (server === 'sabtshod') {
      url = Config.SabtshodBackendAddr + '/createTnx'
    }
    console.log("URL >>>>>> " + url)
    console.log("service >>>>>> " + server)

    return this.instance.post(url, formData, config)
  }

  postUserDocs(url, formData) {
    return this.instance.post(url, formData)
      .then(payload => {
        return payload
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 511) {
          return new Promise(() => {
            store.dispatch({
              type: 'LOGGED_OUT',
              payload: {}
            })
            localStorage.clear()
            return browserHistory.push('/')
          })
        }
        return err
      })
  }

}
