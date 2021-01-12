import React, { useContext, useEffect } from "react";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";

const Login = (props) => {
  const authService = props.authService;

  useEffect(() => {
    async function authenticate() {
      try {
        console.log("awaiting logged in user");
        const [httpStatus, user] = await authService.checkLoggedIn();
        console.log("Waiting finished, login was...");
        if (httpStatus === 200) {
          console.log("Successfull");
          props.setHomeUser(user);
        }
      } catch (error) {
        console.log("Error occured: ", error);
      }
    }

    authenticate();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await authService.Login(
      document.querySelector("#loginEmail").value,
      document.querySelector("#loginPassword").value
    );
    if (response.status !== 200) {
      document.querySelector("#errorMsg").innerHTML =
        "Invalid username or password";
    } else {
      props.setHomeUser(response.data);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Form inline className="justify-content-end">
            <Form.Label htmlFor="loginEmail" srOnly>
              Email address
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="loginEmail" placeholder="Email address" />
            </InputGroup>

            <Form.Label htmlFor="loginPassword" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="loginPassword"
                type="password"
                placeholder="Password"
              />
            </InputGroup>

            <Button
              variant="primary"
              type="submit"
              className="mb-2 mr-sm-2"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <p id="errorMsg" style={errorMsg}></p>
        </Col>
      </Row>
    </div>
  );
};

const errorMsg = { float: "right", color: "red", display: "auto" };

export default Login;
