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
        this.__saveJwt(response.data);
        return response.data;
      });
  }

  async checkLoggedIn() {
    function getCookie(cookieName) {
      const name = cookieName + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      throw `Couldn't find cookie with name ${cookieName}`;
    }
    const authorizationCookie = getCookie('Authorization');
    axios.defaults.headers.common['Authorization'] = authorizationCookie;
    const jwt = authorizationCookie.substring('Bearer '.length);
    const response = await axios
      .get(`https://localhost:5001/api/user/login?jwt=${jwt}`)
      .catch(e => e);
    return [response.status, response.data];
  }

  __saveJwt(payload) {
    function setCookie(name, value, expiresAt) {
      const d = new Date(expiresAt * 1000);
      document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
    }

    const token = payload.jwt;
    delete(payload.jwt);
    const tokenDetails = jwtDecode(token);
    setCookie('Authorization', `Bearer ${token}`, tokenDetails.exp);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
