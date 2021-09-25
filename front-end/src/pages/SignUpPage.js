import React, { useState } from "react";
import { useHistory } from "react-router";
import { useToken } from "../auth/useToken";
import axios from "axios";

const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSignup = async () => {
    const response = await axios.post("http://localhost:8080/api/signup", {
      email: email,
      password: password,
    });

    console.log(response);

    // if (!response.ok) {
    //   console.log("error");
    // }
    const { token } = response.data;

    console.log({ token });

    setToken(token);

    history.push("/");
    console.log({ email, password, confirmPassword });
  };
  return (
    <div className="content-container">
      <h1> Sign up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        placeholder="exampla@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <hr />
      <button
        disabled={!email || !password || password !== confirmPassword}
        onClick={handleSignup}
      >
        Sign up
      </button>
      <button onClick={() => history.push("/login")}>
        Have an account? LogIn here{" "}
      </button>
    </div>
  );
};

export default SignUpPage;
