const errorMiddleware = (err, req, res, next) => {
    // Default error status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error for debugging
    console.error(`[Error] ${statusCode}: ${message}`);
    console.error(err.stack); // Log the full error stack trace

    // Send a structured error response
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Include stack trace in development only
    });
};

export default errorMiddleware;