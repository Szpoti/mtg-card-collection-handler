import React from "react";
import axios from "axios";

export default class UserLoginService {
  Registration(username, email, password) {
    console.log("username,email,password", username, email, password);
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
}
