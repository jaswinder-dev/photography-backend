export class ErrorHandeler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error!";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        message: err.message,
        success: false
    });
};