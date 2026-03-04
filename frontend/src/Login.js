import React, { useState } from "react";
import axios from "axios";

function Login() {

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

        window.location.href = "/welcome";

      }

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

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
}

export default Login;