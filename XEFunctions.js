const axios = require("./axios.js");

const fetchAxiosXe = (type, callback) => {
  axios.fetchFromXe(type, callback);
};

module.exports = { fetchAxiosXe };
