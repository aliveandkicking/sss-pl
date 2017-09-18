class ServerApi {
  post (operation, session, data) {
    const result = new Promise((resolve, reject) => {
      try {
        let httpRequest = new XMLHttpRequest()
        httpRequest.onreadystatechange =
        function () {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
              resolve(httpRequest.responseText)
            } else {
              reject(httpRequest.statusText)
            }
          }
        }
        const url = `bridge.php?operation=${operation}&session=${session}`
        httpRequest.open('POST', url, true)
        httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
        httpRequest.setRequestHeader('Content-type', 'text/html')
        httpRequest.send(data)
      } catch (error) {
        reject(error)
      }
    })
    result.catch(err => {
      console.error(err)
    })
    return result
  }
}

export const serverApi = new ServerApi()
