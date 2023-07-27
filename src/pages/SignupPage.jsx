// src/pages/SignupPage.jsx
import { AuthContext } from "../context/auth.context";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [userId, setUserId] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //   console.log(user);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handlePasswordRepeat = (e) => setHandlePasswordRepeat(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, passwordRepeat, fullName };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        // console.log(response.data.user._id);
        const userId = response.data.user._id; // Get the userId from the response
        setUserId(userId);
        toast.success("Sign Up Successful! Please Login", {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate("/login");

        // Move the second request inside this .then() block
        axios
          .post(`${API_URL}/api/setup-profile/${userId}`, requestBody)
          .then((response) => {
            console.log("profile created");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <div className="form-container">
      <Form onSubmit={handleSignupSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            onChange={handleFullName}
            type="text"
            value={fullName}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input onChange={handleEmail} type="text" value={email} required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            onChange={handlePassword}
            type="password"
            value={password}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password Repeat</Label>
          <Input
            onChange={handlePasswordRepeat}
            type="password"
            value={passwordRepeat}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </Form>
    </div>
  );
}

export default SignupPage;
