import React from "react";
import axios from "axios";
const jwtDecode = require("jwt-decode");

export default class UserLoginService {
  Registration(username, email, password) {
    return axios
      .post(`https://localhost:5001/api/user/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        this.__saveJwt(response.data);
        localStorage.setItem("userId", response.data.id);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  Login(email, password) {
    return axios
      .post(`https://localhost:5001/api/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        this.__saveJwt(response.data);
        localStorage.setItem("userId", response.data.id);
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async checkLoggedIn() {
    const authorizationCookie = this.__getCookie("Authorization");
    axios.defaults.headers.common["Authorization"] = authorizationCookie;
    const jwt = authorizationCookie.substring("Bearer ".length);
    const response = await axios
      .get(`https://localhost:5001/api/user/login?jwt=${jwt}`)
      .catch((e) => e);
    return [response.status, response.data];
  }

  async logOut() {
    await axios.post(`https://localhost:5001/api/user/logout`, {
      jwt: this.__getCookie("Authorization").substring("Bearer ".length),
    });
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("userId");

    this.__setCookie("Authorization", 0, 1);
  }

  __saveJwt(payload) {
    const token = payload.jwt;
    delete payload.jwt;
    const tokenDetails = jwtDecode(token);
    this.__setCookie("Authorization", `Bearer ${token}`, tokenDetails.exp);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  __setCookie(name, value, expiresAt) {
    const d = new Date(expiresAt * 1000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  __getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    throw `Couldn't find cookie with name ${cookieName}`;
  }
}
