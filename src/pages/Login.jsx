import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/Auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [rolUser, setRolUser] = useState("1");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const login = useCallback(
    (e) => {
      e.preventDefault();
      setUser({ username, rolUser });
      navigate("/lounge");
    },
    [setUser, username, rolUser]
  );

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      <form onSubmit={login}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type username..."
        />
        <select name="rolusu" id="cbousu" value={rolUser} onChange={(e) => setRolUser(e.target.value)}>
          <option value="1">General</option>
          <option value="2">Responsable</option>
          <option value="3">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
