import { buildJsonString } from './utils/json-processor'

// let constants = require('./serverapi-constants').constants

class ServerApi {
  post (route, object) {
      const result = new Promise((resolve, reject) => {
          let httpRequest = new XMLHttpRequest()
          httpRequest.onreadystatechange =
              function () {
                  if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                      resolve(httpRequest.responseText + httpRequest.statusText)
                  }
              }
          httpRequest.open("POST",
          'https://thebiktop.000webhostapp.com/text.txt',
          // constants.SERVER_URL + constants.SEPARATOR + route,
          true) // biktop proper path building
          httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
          httpRequest.setRequestHeader('Content-type', 'text/html')
          httpRequest.send(
            // buildJsonString(object)
          )
      })
      result.catch((err) => {console.error(err)})
      return result
  }

  // save (object) {
  //   return this.post(constants.SAVE, object)
  // }

  // load (entity, id, object) {
  //   let result = this.post(constants.LOAD, this.getLoadRequestObject(entity, id)).
  //       then(responseText => {
  //         let transObjs = JSON.parse(responseText)
  //         if ((object) && (transObjs.length > 0)) {
  //           transportObjectProcessor.loadFromTempObject(object, transObjs[0].data)
  //         }
  //         return transObjs
  //       }
  //     )
  //   return result
  // }

  // getLoadRequestObject (entity, ids) {
  //   return {entity, ids: Array.isArray(ids) ? ids : [ids]}
  // }
}

export const serverApi = new ServerApi()
