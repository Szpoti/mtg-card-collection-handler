import React from "react";
import axios from "axios";

export default class UserLoginService {
  Registration(user) {
    return axios
      .post(`https://localhost:5001/api/user/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response.status);
          user.password = "";
        }
        return user;
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
