export class RequiredParameterError extends Error {
    constructor (param) {
      super(`${param} can not be null or undefined.`)
    //When this accessed returns a string representing the location in the code
    // at which Error.captureStackTrace() was called.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, RequiredParameterError)
      }
    }
  }