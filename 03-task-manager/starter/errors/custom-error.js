class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode) => {
    console.log('Creating custom error', msg, statusCode)
    return new CustomAPIError(msg, statusCode)
}

module.exports = { CustomAPIError, createCustomError }