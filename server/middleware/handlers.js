// Response and Error Handlers
function responseFormatter(req, res, next) {
  // Override res.json to format all responses
  const originalJson = res.json.bind(res);

  res.json = function(data) {
    if (data.success === undefined) {
      data.success = res.statusCode < 400;
    }
    return originalJson(data);
  };

  next();
}

function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = {
  responseFormatter,
  errorHandler
};
