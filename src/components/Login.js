import React, { useContext } from "react";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await authService.Login(
      document.querySelector("#loginEmail").value,
      document.querySelector("#loginPassword").value
    );
    if (user === "") {
      console.log("Failed to log in");
      document.querySelector("#errorMsg").innerHTML =
        "Invalid username or password";
    } else {
      document.querySelector("#errorMsg").innerHTML = "";
      console.log("Logged in successfuly as", user.username);
      props.setHomeUser(user);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Form inline className="float-right">
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
