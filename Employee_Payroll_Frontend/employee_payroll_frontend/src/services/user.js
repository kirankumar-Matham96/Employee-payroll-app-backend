const axios = require('axios');

class Service {
  registerUser = (data) => {
    return axios
      .post('http://localhost:9000/registerUser', data)
      .then((res) => res)
      .catch((err) => err);
  };
}

export default Service;
