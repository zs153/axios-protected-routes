import { Link, Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/login">Login</Link>
      </li> */}
      <li>
        <Link to="/lounge">Lounge</Link>
      </li>
      <li>
        <Link to="/fraude">Fraude</Link>
      </li>
      <li>
        <Link to="/usuario">Usuario</Link>
      </li>
    </ul>
    <Outlet />
  </div>
);

export default Layout;
