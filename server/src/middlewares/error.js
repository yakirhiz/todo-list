function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    console.error("[ERROR OCCURED] Triggering error handler...");
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;