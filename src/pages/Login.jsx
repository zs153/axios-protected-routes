import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/Auth";

const Login = () => {
  const [userid, setUserid] = useState('')
  const [pwdusu, setPwdusu] = useState('')

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await axios.post('http://localhost:8100/api/login', {
        userid,
        pwdusu,
      })

      setUser(result.data);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Login page</h1>
      <p>This route has public access.</p>
      <form onSubmit={handleSubmit}>
        <input  type='text'
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          placeholder="Type userid..."
        />
        <input type='password'
          value={pwdusu}
          onChange={(e) => setPwdusu(e.target.value)}
          placeholder="Type password..."
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
