var axios = require("axios").default;

const fetchFromXe = (path, callback) => {
  var axios = require("axios").default;
  const auth = {
    username: "self223475236",
    password: "h8mq4jr2h41072jv8i1do4sh6i",
  };

  var baseURL = `https://xecdapi.xe.com/v1/`;

  const config = () => {
    return { method: "GET", url: baseURL + path, auth: auth };
  };

  axios
    .request(config())
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = { fetchFromXe };
