const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
      case 400:
        res.json({ title: 'Validation failed', message: err.message, stackTrace: err.stack });
        break;
      case 401:
        res.json({ title: 'Unauthorized', message: err.message, stackTrace: err.stack });
        break;
      case 403:
        res.json({ title: 'Connection Forbidden', message: err.message, stackTrace: err.stack });
        break;
      case 404:
        if (err.message === 'Contact Not Found') {
          res.status(404).json({ title: 'Contact Not Found', message: err.message, stackTrace: err.stack });
        } else {
          res.json({ title: 'Not Found', message: err.message, stackTrace: err.stack });
        }
        break;
      case 500:
        res.json({ title: 'Internal Server Error', message: err.message, stackTrace: err.stack });
        break;
      default:
        console.log('This is from the default case in the errorHandler.js');
        break;
    }
};
  
  module.exports = errorHandler;