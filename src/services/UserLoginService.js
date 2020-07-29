import React from "react";
import axios from "axios";

export default class UserLoginService {
  Registration(username, email, password) {
    return axios
      .post(`https://localhost:5001/api/user/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      });
  }

  Login(email, password) {
    return axios
      .post(`https://localhost:5001/api/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        return response.data;
      });
  }
}
