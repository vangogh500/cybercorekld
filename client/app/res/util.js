import { STATUS_SUCCESS } from './numbers.js'

/**
 * Validates email
 * @param {String} email Email
 * @return {Boolean} Whether the email is in a valid syntax
 */
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Validates url
 * @param {String} url URL
 * @return {Boolean} Whether the url is in a valid syntax
 */
export function validateURL(url) {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
}

/**
 * Resolves the response in a callback where both the body and status can be accessed
 * @param {Response} response Response object to resolve
 * @param {Function} cb Callback(status, json): json will be null if status is not 200
 */
export function resolve(response, cb) {
  if(response.status == STATUS_SUCCESS) {
    response.json().then(json =>
      cb(response.status, json)
    )
  }
  else {
    cb(response.status, null)
  }
}

/**
 * Returns a copy of the form content with no null properties
 * @param {Object} formContent The form content to trim (must be a shallow object)
 * @return {Object} The copy of the form content with no null properties
 */
export function trimFormContent(formContent) {
  const toTrim = Object.assign({}, formContent)
  for(var prop in toTrim) {
    if(!toTrim[prop] || prop == "status") {
      delete toTrim[prop]
    }
  }
  return toTrim
}

/**
 * Wraps the content in an emulated synthetic event
 * @param {Any} content The content to wrap.
 * @param {String} name The source of the emulated event.
 * @return {Object} An emulation of a synthetic event
 */
 export function emulateSyntheticEvent(content, name) {
   return {
     target: {
       name,
       value: content
     }
   }
 }
