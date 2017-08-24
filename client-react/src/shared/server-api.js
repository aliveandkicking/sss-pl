import { buildJsonString } from './utils/json-processor'
import { XMLHttpRequest } from 'XMLHttpRequest'

// let constants = require('./serverapi-constants').constants

class ServerApi {
  post (object) {
    const result = new Promise((resolve, reject) => {
      let httpRequest = new XMLHttpRequest()
      httpRequest.onreadystatechange =
          function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
              resolve(httpRequest.responseText + httpRequest.statusText)
            }
          }
      httpRequest.open('POST',
      'https://thebiktop.000webhostapp.com/text.txt',
      // constants.SERVER_URL + constants.SEPARATOR + route,
      true) // biktop proper path building
      httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      httpRequest.setRequestHeader('Content-type', 'text/html')
      httpRequest.send(buildJsonString(object))
    })
    result.catch((err) => { console.error(err) })
    return result
  }
}

export const serverApi = new ServerApi()
