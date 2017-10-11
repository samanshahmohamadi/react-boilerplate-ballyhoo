/**
 * Created by saman on 3/12/17.
 */
import axios from 'axios';
import {browserHistory} from 'react-router'
const Config = {}
Config.UMBackendAddr = 'http://utadoc.com/api'
Config.SabtshodBackendAddr = 'http://sabtshod.com/api'

export default class HttpRequest {
	constructor() {
		this.instance = axios.create()
		this.instance.defaults.headers['Content-Type'] = undefined
	}

	get(url, params) {
		return this.instance.get(url, {
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
			  console.log("HTTP_REQUEST>SUCCESS",payload)
        if (payload.status !== 200) return Promise.reject(payload.status)
				return payload
			})
			.catch(error => {
				if (error.response) {
          console.log("error.response", error.response)
					throw new Error(error.response.status)
				} else if (error) {
				  console.log("ERROR EMPTY >>> "+ error)
          throw new Error(error)
        } else {
					throw new Error(400)
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
