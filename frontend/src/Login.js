import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password
        }
      );

      if (response.status === 200) {

        localStorage.setItem("username", username);

        navigate("/welcome");

      }

    } catch (err) {

      setError("Invalid username or password");

    }
  };

  return (

    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

    </div>

  );
};

export default Login;