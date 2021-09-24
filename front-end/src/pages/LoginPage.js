import React, { useState } from "react";
import { useHistory } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleLogin = async () => {
    console.log({ email, password });
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
      <button disabled={!email || !password} onClick={handleLogin}>
        Log In
      </button>
      <button onClick={() => history.push("/forget-account")}>
        Forget your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have password? SignUp{" "}
      </button>
    </div>
  );
};

export default LoginPage;
