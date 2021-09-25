import React, { useState } from "react";
import { useHistory } from "react-router";
import { useToken } from "../auth/useToken";
import axios from "axios";

const LoginPage = () => {
  const [token, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:8080/api/login", {
      email,
      password,
    });

    const { token } = response.data;

    setToken(token);

    console.log({ email, password });

    history.push("/");
  };
  return (
    <div className="content-container">
      <h1> Log In</h1>
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
      <hr />
      <button disabled={!email || !password} onClick={handleLogin}>
        Log In
      </button>
      <button onClick={() => history.push("/forget-account")}>
        Forget your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have account? SignUp{" "}
      </button>
    </div>
  );
};

export default LoginPage;
