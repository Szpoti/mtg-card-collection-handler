import React from "react";
import { useHistory } from 'react-router-dom';
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
    await authService.Registration(
      document.querySelector("#username").value,
      document.querySelector("#email").value,
      document.querySelector("#password").value
    );
    history.push('/');
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
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
