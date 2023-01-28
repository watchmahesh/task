class CustomError extends Error {
    constructor(error) {
        super(error.message);
        this.statusCode = error.statusCode;
        this.title = error.title ? error.title : 'Internal Server Error';
    }
}
module.exports = CustomError;