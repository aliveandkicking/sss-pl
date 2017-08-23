import { dateUtils } from './dateutils';

export const buildJsonString = (object) => {
  return JSON.stringify(getJsonValue(object))
}

export const loadFromJsonString = (object, jsonString) => {
  loadFromTempObject(object, JSON.parse(jsonString))
  return object
}

const loadFromTempObject = (object, tempObject)  => {

  const getValue = (oldValue, tempValue) => {
    if (oldValue instanceof Date) {
      return dateUtils.fromISOString(tempValue)
    } else if (oldValue instanceof Object) {
      loadFromTempObject(oldValue, tempValue)
    } else {
      return tempValue
    }
  }

  if (!tempObject) {
    return
  }
  for (let key in tempObject) {
    if (tempObject.hasOwnProperty(key)) {
      object[key] = getValue(object[key], tempObject[key])
    }
  }
}

const getJsonValue = (value) => {
  let result = value
  if (value instanceof Date) {
    result = dateUtils.toISOString(value)
  } else if (Array.isArray(value)) {
    result = value.map((value, i, array) => getJsonValue(value))
  } else if (value instanceof Object) {
    result = {}
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (!(value[key] instanceof Function)) {
          result[key] = getJsonValue(value[key])
        }
      }
    }
  }
  return result
}
