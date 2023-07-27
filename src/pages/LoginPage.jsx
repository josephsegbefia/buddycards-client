import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton
} from "../layout-components/components";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        toast.success("Login successful", {
          position: toast.POSITION.TOP_RIGHT
        });

        navigate(`/profile/${response.data.userId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        toast.error("Login Failed. Try Again", {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleLoginSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <Input onChange={handleEmailChange} type="email" required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input onChange={handlePasswordChange} type="password" required />
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>
      </Form>
    </div>
  );
}

export default LoginPage;
