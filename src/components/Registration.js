import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

const Registration = (props) => {
  const authService = props.authService;
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    const password = document.querySelector("#password").value;
    if (!isValidPassword(password)) {
      console.log(document.querySelector("#password").style);
      document.querySelector("#password").style.border = "1px solid red";
      document.querySelector("#errorMsg").innerHTML =
        "Invalid password! It should contain at least one digit, one upper and lower case letter, and one of the following special characters: !@#$%&*()-+=^";
      document.querySelector("#errorMsg").style.color = "red";
      return;
    } else {
      document.querySelector("#password").style.border = "";
      document.querySelector("#errorMsg").innerHTML = "";
      document.querySelector("#errorMsg").style.color = "";
    }
    const resp = await authService.Registration(
      document.querySelector("#username").value,
      document.querySelector("#email").value,
      password
    );
    if (resp.status !== 200) {
      document.querySelector("#errorMsg").innerHTML = resp.data;
      document.querySelector("#errorMsg").style.color = "red";
    } else {
      history.push("/");
    }
  };

  const isValidPassword = (input) => {
    return /(?=[A-Za-z0-9@!@#$%&*()\-+=^]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*()\-+=^]).*$/.test(
      String(input)
    );
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-lg-4 text-center">
          <p className="h2">Registration</p>
          <Form>
            <Form.Label htmlFor="username" srOnly>
              Username
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control id="username" placeholder="Username" />
            </InputGroup>

            <Form.Label htmlFor="email" srOnly>
              Email address
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="email" placeholder="Email address" />
            </InputGroup>

            <Form.Label htmlFor="password" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mb-2 mr-sm-2">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
              />
            </InputGroup>

            <Button
              variant="primary"
              type="submit"
              className="mb-2 mr-sm-2"
              onClick={handleRegister}
            >
              Registration
            </Button>
          </Form>
          or <Link to={"/"}>Login</Link>
          <p id="errorMsg"></p>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
