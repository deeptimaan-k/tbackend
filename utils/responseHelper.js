const sendResponse = (res, status, message, data) => {
    res.status(status).json({
      message: message,
      data: data,
    });
  };
  
  module.exports = sendResponse;
  