// src/pages/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton
} from "../layout-components/components";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setHandlePasswordRepeat] = useState("");
  const [fullName, setFullName] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordRepeat = (e) => setHandlePasswordRepeat(e.target.value);
  const handleFullName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, fullName };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSignupSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input onChange={handleFullName} type="email" required />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input onChange={handleEmail} type="text" required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input onChange={handlePassword} type="password" required />
        </FormGroup>
        <FormGroup>
          <Label>Password Repeat</Label>
          <Input onChange={handlePasswordRepeat} type="password" required />
        </FormGroup>
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </Form>
    </div>
  );
}

export default SignupPage;
