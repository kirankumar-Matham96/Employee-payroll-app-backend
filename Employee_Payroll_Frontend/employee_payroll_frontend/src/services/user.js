const axios = require('axios');

class Service {
  registerUser = (data) => {
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}registerUser`, data)
      .then((res) => {
        console.log(`response from axios: ${res}`);
        return res;
      })
      .catch((err) => err);
  };
}

export default Service;
